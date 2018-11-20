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
        this._camera.attachControl(this._canvas, false);
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
        var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 2 }, this._scene);
        sphere.position.y = 1;
        var ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6, subdivisions: 2 }, this._scene);
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
    return MyConfigurator;
}());
window.addEventListener('DOMContentLoaded', function () {
    var configurator = new MyConfigurator('renderCanvas');
    configurator.createScene();
    BABYLON.SceneLoader.ImportMesh("", "", "interior.obj", configurator.getScene(), function (object) {
        console.log(object);
    });
});
//# sourceMappingURL=configurator.js.map