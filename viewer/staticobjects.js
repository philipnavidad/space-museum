'use strict';

(function(exports){

	function setTransform(obj, xfrm){
		obj.matrixAutoUpdate = false;
		obj.matrix.fromArray(xfrm);
		obj.matrix.decompose(obj.position, obj.quaternion, obj.scale);
	}

	exports.initialize = function(env, root, assets)
	{
		// place display rocket
		var scaleRoot = new THREE.Object3D(); scaleRoot.name = 'scaleRoot';
		setTransform(assets.models.rocket, [-0.08, 0, 0, 0, 0, 0, 0.08, 0, 0, 0.08, 0, 0, 0, 1.75, 0, 1]);
		setTransform(assets.posters.info1, [0, 0, -1.2, 0, 0, 1.2, 0, 0, 1.2, 0, 0, 0, 0, 1.5, 1, 1]);
		setTransform(assets.posters.info2, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1.5, -1, 1]);
		setTransform(assets.posters.info3, [0, 0, -2.5, 0, -1.7677669525146484, 1.7677669525146484, 0, 0, 1.7677669525146484, 1.7677669525146484, 0, 0, 1, 0.5, 0, 1]);
		scaleRoot.add(assets.models.rocket, assets.posters.info1, assets.posters.info2, assets.posters.info3);
		scaleRoot.position.set(-31, 0, 1.8);

		/*
		 * place arrows
		 */
		// set up template
		var arrowRoot = new THREE.Object3D(); arrowRoot.name = 'arrowRoot';
		var temp = assets.posters.arrow;
		temp.material.map.wrapT = THREE.RepeatWrapping;
		temp.material.map.wrapS = THREE.RepeatWrapping;
		temp.material.map.repeat.y = 5;
		temp.material.transparent = true;
		temp.scale.set(.85, 4.26, 1);
		temp.userData.altspace = {collider: {enabled: false}};

		var positions = [
			[-22, 0.01, -5],
			[-14, 0.01, -4],
			[-10, 1.75, -10.3],
			[-0.2, 3, -10],
			[0, 4.3, -13.2],
			[-6.5, 4.3, -13.7]
		];
		var rotations = [
			[-1.5707962827705675, 0, -2.0943951617841434],
			[-1.5707963484304415, 3.8192581541807165e-8, 0],
			[-1.5707962886023292, 2.163553780576422e-8, -1.570796395844246],
			[-1.5707962900545052, -0.3490657666126316, -1.5707964138930883],
			[-1.5707963561444291, -1.2774839319718047e-7, 1.5707963267948966],
			[-1.570796394526992, -1.0028011132590126e-7, 1.2217304725064826]
		];

		// generate arrows
		for(var i=0; i<6; i++){
			var arrow = i===0 ? temp : temp.clone();
			arrow.name = 'arrow'+i;
			arrow.position.set.apply(arrow.position, positions[i] || [0,0,0]);
			arrow.rotation.set.apply(arrow.rotation, rotations[i] || [0,0,0]);
			arrowRoot.add(arrow);
		}

		// add panorama ball
		var marsBall = new THREE.Mesh(
			new THREE.SphereGeometry(1.5, 32, 16),
			new THREE.MeshBasicMaterial({map: assets.textures.mars_pano})
		);
		marsBall.name = 'marsBall';
		marsBall.material.side = THREE.BackSide;
		marsBall.material.map.wrapS = THREE.RepeatWrapping;
		marsBall.material.map.offset.setX(0.5);
		marsBall.userData.altspace = {collider: {enabled: false}};
		marsBall.position.set(12, 1.5, -1);

		// add memorial
		var memorialRoot = new THREE.Object3D(); memorialRoot.name = 'memorialRoot';
		assets.posters.memwall.position.set(0,0,-1);
		assets.posters.memwall.scale.setScalar(2.5);
		assets.posters.memquote.position.set(-2, 0, -0.5);
		assets.posters.memquote.rotation.set(0, Math.PI/6, 0);
		assets.posters.memquote.scale.setScalar(1.5);
		memorialRoot.add(assets.posters.memwall, assets.posters.memquote);
		memorialRoot.position.set(1,1.3,-8);

		// add rocket equation poster
		var rocketEq = assets.posters.rocketeq; rocketEq.name = 'rocketEq';
		rocketEq.scale.setScalar(2.5);
		rocketEq.position.set(10, 6.2, -13.8);

		var octaweb = assets.posters.octaweb; octaweb.name = 'octaweb';
		octaweb.scale.setScalar(7);
		octaweb.rotation.set(0, 5*Math.PI/4, 0);
		octaweb.position.set(14, 0, 11);

		var apollo13 = assets.posters.apollo13; apollo13.name = 'apollo13';
		apollo13.position.set(0, 2.25, 5.3);
		apollo13.rotation.set(0, 3.57, 0);
		apollo13.scale.setScalar(3)

		var deltav_map = assets.posters.deltav_map; deltav_map.name = 'deltav_map';
		deltav_map.scale.setScalar(3);
		deltav_map.rotation.set(0, 3*Math.PI/4, 0);
		deltav_map.position.set(-30, 1.5, 11);
		deltav_map.material.color.setScalar(0.8)

		var saturn = assets.posters.saturn; saturn.name = 'saturn';
		saturn.position.set(-0.53, 5.9, -14.9);
		saturn.scale.setScalar(1.7);

		var enceladus = assets.posters.enceladus; enceladus.name = 'enceladus';
		enceladus.position.set(-4.25, 5.9, -14.9);
		enceladus.scale.set(1.7, 1.2, 1);
		enceladus.material.map.wrapS = THREE.ClampToEdgeWrapping;
		enceladus.material.map.repeat.x = 1.7/1.2;
		enceladus.material.map.offset.x = (1.7/1.2-1)/-2;

		var martian = assets.posters.martian; martian.name = 'martian';
		martian.position.set(-21, 2, -12);
		martian.scale.setScalar(4);
		martian.material.color.setScalar(0.7);

		var europa = assets.posters.europa; europa.name = 'europa';
		europa.position.set(3.2, 5.9, -14.9);
		europa.scale.set(1.7, 1.25, 1);
		europa.material.map.wrapS = THREE.ClampToEdgeWrapping;
		europa.material.map.repeat.x = 1.7/1.25;
		europa.material.map.offset.x = (1.7/1.25-1)/-2;

		var planetary_society = assets.posters.planetary_society; planetary_society.name = 'planetary_society';
		planetary_society.position.set(9.5, 3, -12);
		planetary_society.scale.setScalar(5);
		planetary_society.material.transparent = true;

		var shuttle = assets.models.shuttle.parent; shuttle.name = 'shuttle';
		shuttle.children[0].children[0].children[0].material.map.wrapS = THREE.RepeatWrapping;
		shuttle.position.set(-14.426798106524636, 7.5, 0.17731212399680402);
		shuttle.rotation.set(0, 1.25, Math.PI);
		shuttle.traverse(function(o){
			if(o instanceof THREE.Mesh){
				o.userData.altspace = {collider: {enabled: false}};
				o.material.color.setScalar(0.6);
			}
		});

		root.add(scaleRoot, arrowRoot, marsBall, memorialRoot, rocketEq, octaweb, apollo13,
			deltav_map, saturn, enceladus, martian, europa, planetary_society, shuttle);
	};


	exports.assets = {
		models: {
			rocket: 'models/falcon9.gltf',
			shuttle: 'models/shuttle.gltf'
		},
		textures: {
			mars_pano: 'textures/mars_pano.jpg'
		},
		posters: {
			info1: 'textures/first.png',
			info2: 'textures/second.png',
			info3: 'textures/overview.png',
			arrow: 'textures/arrow.png',
			memwall: 'textures/memorial.png',
			memquote: 'textures/memorial-quote.png',
			rocketeq: 'textures/rocket-equation.png',
			octaweb: 'textures/finishing-touches-on-octaweb.jpg',
			apollo13: 'textures/Apollo-13-movie-poster.jpg',
			deltav_map: 'textures/AAGJvD1.png',
			saturn: 'textures/cassini_20170209-home.jpg',
			enceladus: 'textures/Enceladus_craters_and_complex_fractured_terrains_1079x809.jpg',
			martian: 'textures/martian_movie-poster-new.jpg',
			europa: 'textures/pia19048.jpg',
			planetary_society: 'textures/planetary-society.png'
		}
	};

})(window.StaticObjects = window.StaticObjects || {});
