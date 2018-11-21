"use strict";
///<reference path="babylon.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var MyConfigurator = /** @class */ (function () {
    function MyConfigurator(canvasElement) {
        this._canvas = document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }
    MyConfigurator.prototype.createScene = function () {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera("camera1", 0, 0, 10, BABYLON.Vector3.Zero(), this._scene);
        //this._camera.attachControl(this._canvas,false);
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
    };
    MyConfigurator.prototype.doRender = function () {
        var _this = this;
        this._engine.runRenderLoop(function () { _this._scene.render(); });
        window.addEventListener('resize', function () {
            _this._scene.render();
        });
    };
    MyConfigurator.prototype.getScene = function () {
        return this._scene;
    };
    MyConfigurator.prototype.getEngine = function () {
        return this._engine;
    };
    return MyConfigurator;
}());
//let configurator=new MyConfigurator('renderCanvas');
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, { stencil: true });
var scene;
var camera;
var light;
var hl;
var index = 1;
var loader = BABYLON.SceneLoader.Load("", "Office_chair.obj", engine, function (newScene) {
    console.log(newScene);
    scene = newScene;
    hl = new BABYLON.HighlightLayer("highlight", scene);
    //scene.useRightHandedSystem=true;
    var mesh = scene.meshes[0];
    mesh.rotate(BABYLON.Axis.X, -Math.PI / 2);
    //var mesh=<BABYLON.Mesh>scene.meshes[0]
    //hl.addMesh(mesh,BABYLON.Color3.Blue());
    mesh.scaling.x = 0.01;
    mesh.scaling.y = 0.01;
    mesh.scaling.z = 0.01;
    var material = new BABYLON.StandardMaterial("mat", scene);
    // material.diffuseColor = BABYLON.Color3.Green();
    material.bumpTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_plastic_normal.png", scene);
    material.diffuseTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_plastic_dif.png", scene);
    var material2 = new BABYLON.StandardMaterial("mat2", scene);
    // material2.diffuseColor=BABYLON.Color3.Blue();
    material2.diffuseTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_fabric_dif.png", scene);
    material2.bumpTexture = new BABYLON.Texture("C:/Users/kmingulov/Documents/Configurator/Office_chair_fabric_normal.png", scene);
    //mesh.material=material;
    var multimat = new BABYLON.MultiMaterial("mumat", scene);
    multimat.subMaterials.push(material);
    multimat.subMaterials.push(material2);
    var vertcount = mesh.getTotalVertices();
    mesh.subMeshes.push(new BABYLON.SubMesh(0, 0, vertcount, 0, 0, mesh));
    mesh.subMeshes.push(new BABYLON.SubMesh(1, 0, vertcount, 0, 10650, mesh));
    mesh.material = multimat;
    //scene.addEffectLayer(hl);
    light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    camera = new BABYLON.FreeCamera("camera", BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.position.y = 10;
    camera.setTarget(BABYLON.Vector3.Zero());
    engine.runRenderLoop(function () { scene.render(); });
    scene.addLight(light);
});
//# sourceMappingURL=configurator.js.map