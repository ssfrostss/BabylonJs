"use strict";
///<reference path="babylon.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, { stencil: true });
var scene;
var camera;
var light;
var hl;
var materialindex;
var back;
var slider = document.getElementById("myRange");
slider.oninput = function () {
    //back.setPivotPoint(new Vector3(10,10,10));
    //back.rotate(BABYLON.Axis.X, parseFloat(slider.value))
};
window.addEventListener("click", function () {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit) {
        hl.addMesh(pickResult.pickedMesh, BABYLON.Color3.Blue());
        this.console.log(scene.meshes.indexOf(pickResult.pickedMesh));
    }
});
var loader = BABYLON.SceneLoader.Load("", "Chairsplit.obj", engine, function (newScene) {
    console.log(newScene);
    scene = newScene;
    hl = new BABYLON.HighlightLayer("highlight", scene);
    var ax = new BABYLON.Vector3(1, 0, 0);
    scene.registerBeforeRender(function () {
        var i = 0;
        back.rotate(new BABYLON.Vector3(0.1, 0, 0), 0.01);
    });
    materialindex = new Array(scene.meshes.length);
    materialindex.fill(0);
    materialindex[0] = 1;
    materialindex[32] = 1;
    var material = new BABYLON.StandardMaterial("mat", scene);
    material.bumpTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_plastic_normal.png", scene);
    material.diffuseTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_plastic_dif.png", scene);
    var material2 = new BABYLON.StandardMaterial("mat2", scene);
    material2.diffuseTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_fabric_dif.png", scene);
    material2.bumpTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_fabric_normal.png", scene);
    scene.materials[0] = material;
    scene.materials[1] = material2;
    scene.meshes.forEach(function (x, i) {
        x.material = scene.materials[materialindex[i]];
    });
    for (var i = 32; i < 36; i++) {
        if (i == 34) {
            continue;
        }
        console.log(i);
        scene.meshes[i].parent = scene.meshes[34];
    }
    back = scene.meshes[34];
    //back.setPivotPoint(new Vector3(100,0,0),Space.WORLD)
    //scene.meshes[0].material=material2;
    //scene.meshes[32].material=material2;
    light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    camera = new BABYLON.FreeCamera("camera", BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.position.y = 10;
    camera.setTarget(BABYLON.Vector3.Zero());
    engine.runRenderLoop(function () { scene.render(); });
    scene.addLight(light);
});
//# sourceMappingURL=configurator.js.map