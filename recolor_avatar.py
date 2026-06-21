# Avatar recolor — "edit once, apply to every scene".
#
# There is no Blender library-link master: each scene .blend has its own copy
# of the avatar. Instead, the avatar's look is driven by materials whose names
# start with Hair / Skin / Cloth / Shirt / Pants / Boots. This script finds the
# avatar mesh in every scene (any mesh that has a Skin* or Hair* material slot)
# and recolors only that mesh's materials, then re-exports the matching GLB.
# Materials shared with the environment (e.g. Boots is also the island dirt in
# title.blend) are copied per-avatar so the scenery is never touched.
#
# HOW TO RUN
#   1. Open Blender with the BlenderMCP addon running (Start MCP Server).
#   2. Edit COLORS below to taste.
#   3. From this folder:  blender --background --python recolor_avatar.py
#      (or pipe the file to the running BlenderMCP socket — see how it was built)
#   4. Re-run compression on the plain-exported GLBs:  ./compress_models.sh
#      NOTE: languages.glb and safari.glb fail gltf-pipeline's Draco encoder
#      (morph targets); this script already Draco-compresses those two via
#      Blender and exports safari without morph targets.

import bpy, os

HERE = os.path.dirname(os.path.abspath(__file__))
SCENES = os.path.join(HERE, "scenes")
MODELS = os.path.join(HERE, "public", "models")

# --- The look. Edit these. (RGBA, 0..1) ---------------------------------------
BROWN = (0.497, 0.292, 0.140, 1.0)  # original boots/dirt brown (used to restore terrain)
COLORS = {
    "hair":  (0.910, 0.840, 0.600, 1.0),  # bleached platinum blonde
    "skin":  (0.800, 0.500, 0.300, 1.0),  # warm tan
    "cloth": (0.880, 0.620, 0.620, 1.0),  # shirt (dusty pink)
    "shirt": (0.880, 0.620, 0.620, 1.0),  # shirt alt-name in some scenes
    "pants": (0.830, 0.720, 0.520, 1.0),  # khaki shorts
    "boots": (0.920, 0.920, 0.900, 1.0),  # white sneakers
}
# ------------------------------------------------------------------------------

# Scenes whose GLB must be Draco-compressed by Blender (gltf-pipeline chokes on them)
DRACO_IN_BLENDER = {"languages", "safari"}
# safari has shape keys whose buffers break under Draco -> drop morph targets
NO_MORPH = {"safari"}

SCENE_LIST = ["avatar", "title", "home", "uni", "devops", "preply", "city",
              "languages", "candle", "phd", "experience", "safari", "contact", "tc"]


def target_for(name):
    n = name.lower()
    for key, col in COLORS.items():
        if n.startswith(key):
            return col
    return None


def set_color(mat, col):
    mat.diffuse_color = col
    if mat.use_nodes and mat.node_tree:
        bsdf = mat.node_tree.nodes.get("Principled BSDF")
        if bsdf and "Base Color" in bsdf.inputs:
            bsdf.inputs["Base Color"].default_value = col


def is_avatar(obj):
    return obj.type == "MESH" and any(
        s.material and (s.material.name.lower().startswith("skin")
                        or s.material.name.lower().startswith("hair"))
        for s in obj.material_slots
    )


def export_glb(name):
    glb = os.path.join(MODELS, name + ".glb")
    if not os.path.exists(glb):
        return False
    wm = bpy.context.window_manager
    win = wm.windows[0]; scr = win.screen
    area = next((a for a in scr.areas if a.type == "VIEW_3D"), scr.areas[0])
    region = next((r for r in area.regions if r.type == "WINDOW"), area.regions[0])
    kw = dict(filepath=glb, export_format="GLB", export_apply=True)
    if name in NO_MORPH:
        kw["export_morph"] = False
    if name in DRACO_IN_BLENDER:
        kw.update(export_draco_mesh_compression_enable=True,
                  export_draco_mesh_compression_level=6)
    with bpy.context.temp_override(window=win, screen=scr, area=area, region=region):
        bpy.ops.export_scene.gltf(**kw)
    return True


def main():
    from collections import defaultdict
    for scene in SCENE_LIST:
        fp = os.path.join(SCENES, scene + ".blend")
        if not os.path.exists(fp):
            continue
        bpy.ops.wm.open_mainfile(filepath=fp)

        # Restore any boots-named material to brown first (so shared terrain is safe)
        for m in bpy.data.materials:
            if m.name.lower().startswith("boots"):
                set_color(m, BROWN)

        users = defaultdict(set)
        avatars = set()
        for o in bpy.data.objects:
            if o.type == "MESH":
                for sl in o.material_slots:
                    if sl.material:
                        users[sl.material.name].add(o.name)
        for o in bpy.data.objects:
            if is_avatar(o):
                avatars.add(o.name)

        for o in bpy.data.objects:
            if o.name not in avatars:
                continue
            for sl in o.material_slots:
                m = sl.material
                if not m:
                    continue
                col = target_for(m.name)
                if not col:
                    continue
                shared_outside = any(u not in avatars for u in users[m.name])
                if shared_outside:
                    copy = m.copy()
                    set_color(copy, col)
                    sl.material = copy
                else:
                    set_color(m, col)

        bpy.ops.wm.save_mainfile()
        if scene != "avatar":
            export_glb(scene)
        print("processed", scene, "avatars:", sorted(avatars))


main()
