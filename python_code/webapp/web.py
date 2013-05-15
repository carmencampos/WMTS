import sys, os, json, bottle

bottle.TEMPLATE_PATH.append(os.path.join(os.path.dirname(__file__), "../templates"))

application = bottle.Bottle()

@application.route('/assets/:path#.+#')
def server_static(path):
    return bottle.static_file(path, root=os.path.dirname(__file__) + "/../assets")

@application.route('/')
@bottle.view('main')
def web_main():
    return dict()
    #return dict(title="Tiny Tile Server")#, menu="main")

@application.route('/leaflet')
@bottle.view('leaflet')
def web_leaflet():
	return dict()#title="Leaflet Example")#, menu="leaflet")
	
@application.route('/openlayers')
@bottle.view('openlayers')
def web_openlayers():
	return dict()#title="Openlayers Example")#, menu="openlayers")

@application.route('/exampleLL')
@bottle.view('exampleLL')
def web_leaflet1():
	return dict()

@application.route('/exampleLLlocal')
@bottle.view('exampleLLlocaL')
def web_leaflet2():
	return dict()

@application.route('/switzerlandLL')
@bottle.view('switzerlandLL')
def web_leaflet_switzerland1():
	return dict()

@application.route('/switzerlandLLlocal')
@bottle.view('switzerlandLLlocaL')
def web_leaflet_switzerland2():
	return dict()
	
@application.route('/exampleOL')
@bottle.view('exampleOL')
def web_openlayers1():
	return dict()

@application.route('/exampleOLlocal')
@bottle.view('exampleOLlocaL')
def web_openlayers2():
	return dict()

@application.route('/switzerlandOL')
@bottle.view('switzerlandOL')
def web_openlayers_switzerland1():
	return dict()

@application.route('/switzerlandOLlocal')
@bottle.view('switzerlandOLlocaL')
def web_openlayers_switzerland2():
	return dict()
	
@application.route('/tileMillExample')
@bottle.view('tileMillExample')
def web_tileMillExample():
	return dict()
	
@application.route('/tileMillSwitzerland')
@bottle.view('tileMillSwitzerland')
def web_tileMillSwitzerland():
	return dict()
	
@application.route('/tileMillSwitzerlandAntes')
@bottle.view('tileMillSwitzerlandAntes')
def web_tileMillSwitzerlandAntes():
	return dict()