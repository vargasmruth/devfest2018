

var scrolled = 0;

var DsWith = window.innerWidth;
var DsHeight = screen.availHeight;

var windowHalfX = DsWith / 2;
var windowHalfY = DsHeight / 2;
var mouseX = windowHalfX;
var mouseY = windowHalfY;


var scene = new THREE.Scene(); scene.fog=new THREE.Fog( 0x000000, 0.08, 35);
var camera = new THREE.PerspectiveCamera(30, DsWith / DsHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer( { canvas: jQuery('#universum').get(0) } );
renderer.setSize( DsWith, DsHeight );

document.body.appendChild( renderer.domElement );


var light = new THREE.AmbientLight( 0xffffff );
scene.add( light );

renderer.setClearColor(  0x0c0e0c, 1 );


//stars
var star = starGlow = starGlow2 = [];
var geometry = new THREE.SphereGeometry( .006, .006, .006 );
var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
var materialglow = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: .07, transparent: true} );
var StarCount = 300;
if (DsWith <= 1024 || DsHeight <= 768) {
  materialglow.opacity = .3;
  StarCount = 130;
}

for (var i = 0; i < StarCount; i++) {

  star = new THREE.Mesh( geometry, material );
  star.position.x = Math.random() * (0 - 16) +8;
  star.position.y = Math.random() * (0 + 6) +17;
  star.position.z = Math.random() * (0 - 16) +8;
  starGlow2.class="star";
  scene.add( star );

  starGlow = new THREE.Mesh( new THREE.SphereGeometry( .015, .015, .015 ), materialglow );
  starGlow.position.x = star.position.x;
  starGlow.position.y = star.position.y;
  starGlow.position.z = star.position.z;
  starGlow2.class="starGlow";
	scene.add( starGlow );

  starGlow2 = new THREE.Mesh( new THREE.SphereGeometry( .022, .022, .022 ), materialglow );
  starGlow2.position.x = star.position.x;
  starGlow2.position.y = star.position.y;
  starGlow2.position.z = star.position.z;
  starGlow2.class="starGlow2";
	scene.add( starGlow2 );
}

//camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 15;

var cameraTarget
cameraTarget = new THREE.Vector3(0,0,3);

scene.position.y = -20;


document.addEventListener( 'mousemove', onDocumentMouseMove, false );


//ON CHANGE ORIENTATION
var DsDefaultPort = ($(window).width() > $(window).height())? 90 : 0;

$(window).bind("resize", function(){
    
    var DsOrienWidth = $(window).width();
    var DsOrienHeight = screen.availHeight;
    
    screenOrientation = ( DsOrienWidth > DsOrienHeight )? 90 : 0;

    if (DsDefaultPort != screenOrientation) {
    
        windowHalfX = DsOrienWidth / 2;
        windowHalfY = DsOrienHeight / 2;
    
        camera.aspect = DsOrienWidth / DsOrienHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( DsOrienWidth, DsOrienHeight );
        cameraTarget = new THREE.Vector3(0,0,3);  
            
            DsDefaultPort = screenOrientation;
    }

});


//MOUSE MOVE
function onDocumentMouseMove( event ) {
    mouseX = ( event.clientX - windowHalfX);
  	mouseY = ( event.clientY - windowHalfY);
}


//tween mouse

  var mousePos = { x: mouseX, y: mouseY }
  var mouseNewX = mouseX;
  var mouseNewY = mouseY;

//visualization
function render(time) {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  scene.rotation.y += 0.0004;

  mouseNewX = mouseX - ( (mouseX - mouseNewX) / 1.2);
  mouseNewY = mouseY - ( (mouseY - mouseNewY) / 1.2);

  camera.position.x = ( mouseNewX - camera.position.x ) * 0.002;
  camera.position.y = ( - mouseNewY - camera.position.y ) * 0.002;

if ( DsWith > 1024 ) {
    var WorkImg = jQuery('.ds-work-image');
    var WorkTitle = jQuery('.ds-work-title h2');
    
    WorkImg.css('left', -mouseNewX/40);
    WorkImg.css('top', -mouseNewY/40);
    
    WorkTitle.css('left', -mouseNewX/20);
    WorkTitle.css('top', -mouseNewY/20);
}

  camera.lookAt(cameraTarget);

}