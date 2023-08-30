/*
    By: Valentina Zorrilla Diaz 
    Date of creation: 23/8/2023
    Last modification: 30/8/2023 (11:00 pm)
*/

//Creation of elements 
var scene = null,
    camera = null,
    renderer = null,
    controls = null;
   // cube= null,
   // torus=null,
   // sphere=null;

//Variables for Switch 
var mesh, material, geometry, shapes=[];

    const size = 35,
        divisions = 35;

function startScene() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xA3E4D7 );
    camera = new THREE.PerspectiveCamera(
        75,                                     //Angulo de vision 
        window.innerWidth / window.innerHeight, //Relacion de aspecto 16:9
        0.1,                                    //Mas cerca (no renderiza)
        1000);                                 //mas lejos (no renderiza)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('app') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

//-----ORBIT CONTROLS-----
    controls = new THREE.OrbitControls(camera,renderer.domElement);
    camera.position.set(0,0,0);
    controls.update();


//-----OBJECTS-----
    //Cube
    //const geometry = new THREE.BoxGeometry(1, 1, 1); //(width, height, depth)
   // const material = new THREE.MeshBasicMaterial({ color: 0x7D3C98, wireframe: true });
    //cube = new THREE.Mesh(geometry, material);
    //scene.add(cube);

    //Torus
    //const geometryTorus = new THREE.TorusGeometry( 0.8, 0.1, 5, 50 ); 
    //const materialTorus = new THREE.MeshBasicMaterial( { color: 0x7D3C98, wireframe:true } ); 
    //torus = new THREE.Mesh( geometryTorus, materialTorus ); 
    //scene.add( torus );

    // Sphere
    //const geometrySphere = new THREE.SphereGeometry( 1, 10, 30 ); 
    //const materialSphere = new THREE.MeshBasicMaterial( { color: 0x7D3C98, wireframe: true } ); 
    //sphere = new THREE.Mesh( geometrySphere, materialSphere ); 
    //scene.add( sphere );

    //sphere.position.x=4;
    //torus.position.x=-4;

    camera.position.z = 5;

    //Grid Helper 
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    //Axes Helper
    const axesHelper = new THREE.AxesHelper( 5 );
    scene.add( axesHelper );

    animate(); 
}


// function createGeometry() {} hacer un switch case (cube, torus, sphere)
function createGeometry(object){
        switch(object) {
            case "cube":
              geometry =new THREE.BoxGeometry(1,1,1);
              break;

            case "torus":
              geometry =new THREE.TorusGeometry(0.8, 0.1, 5, 50 );
              break;

            case "sphere":
                geometry =new THREE.SphereGeometry(1, 10, 30 );
              break;

            default:
              console.error('NO SE ENCONTRO ESA FIGURA');
          }

        material = new THREE.MeshBasicMaterial( { color: 0x7D3C98, wireframe:true } ); 
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random()-0.5)* size;
        mesh.position.y = (Math.random()-0.5)* size;
        mesh.position.z = (Math.random()-0.5)* size;

        scene.add (mesh);

        shapes.push(mesh);

    }
        
     //   cube.rotation.x +=0.02;
    //  cube.rotation.y +=0.02;
      //  torus.rotation.x -=0.02;
        //torus.rotation.y -=0.02;
       // sphere.rotation.x -=0.02;
       // sphere.rotation.y -=0.02;

function animate() {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    for(let i=0;i<shapes.length; i++){
        shapes[i].rotation.x +=0.02;
        shapes[i].rotation.y += 0.02;
    }
}


//Window resisze 
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
    
