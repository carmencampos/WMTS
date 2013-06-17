import sys, os, json, bottle

bottle.TEMPLATE_PATH.append(os.path.join(os.path.dirname(__file__), "../templates"))

app = bottle.Bottle()

@app.route('/assets/:path#.+#')
def server_static(path):
    return bottle.static_file(path, root=os.path.dirname(__file__) + "/../assets")

@app.route('/')
@bottle.view('main')
def web_main():
    return dict()

@app.route('/tutorials')
@bottle.view('tutorials')
def web_tutorials():
	return dict()

@app.route('/planning')
@bottle.view('planning')
def web_planning():
	return dict()

@app.route('/protocol')
@bottle.view('protocol')
def web_protocol():
	return dict()

# XYZ
@app.route('/exampleLL')
@bottle.view('exampleLL')
def web_leaflet1():
	return dict()

@app.route('/exampleLLlocal')
@bottle.view('exampleLLlocal')
def web_leaflet2():
	return dict()

@app.route('/switzerlandLL')
@bottle.view('switzerlandLL')
def web_leaflet_switzerland1():
	return dict()

@app.route('/switzerlandLLlocal')
@bottle.view('switzerlandLLlocaL')
def web_leaflet_switzerland2():
	return dict()

@app.route('/exampleOL')
@bottle.view('exampleOL')
def web_openlayers1():
	return dict()

@app.route('/exampleOLlocal')
@bottle.view('exampleOLlocaL')
def web_openlayers2():
	return dict()

@app.route('/switzerlandOL')
@bottle.view('switzerlandOL')
def web_openlayers_switzerland1():
	return dict()

# WMTS
@app.route('/exampleOLwmts')
@bottle.view('exampleOLwmts')
def web_leaflet_wmts():
	return dict()

@app.route('/switzerlandLLwmts')
@bottle.view('switzerlandLLwmts')
def web_openlayers_wmts():
	return dict()
	
# TUTORIALS
@app.route('/switzerlandOLlocal')
@bottle.view('switzerlandOLlocaL')
def web_openlayers_switzerland2():
	return dict()
	
@app.route('/tileMillExample')
@bottle.view('tileMillExample')
def web_tileMillExample():
	return dict()
	
@app.route('/tileMillSwitzerland')
@bottle.view('tileMillSwitzerland')
def web_tileMillSwitzerland():
	return dict()
	
@app.route('/tileMillSwitzerlandAntes')
@bottle.view('tileMillSwitzerlandAntes')
def web_tileMillSwitzerlandAntes():
	return dict()