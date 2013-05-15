#!/usr/bin/env python
import sys, os, argparse

# add packages
try:
    import bottle
except:
    sys.path.append(os.path.join(os.path.dirname(__file__), "packages"))
    import bottle

sys.path.append(os.path.join(os.path.dirname(__file__), "webapp"))

import web
import api

def get_app():
	# load main application
    app = web.application
	
	# load modules (sub-applications)
    app.mount(app=api.api, prefix='/api')
    
    return app


if __name__ == "__main__":
    
    parser = argparse.ArgumentParser(description='tiny tile server')
    parser.add_argument('-p', dest='port', help='port', required=False, default=8000)
    parser.add_argument('-d', dest='debug', help='boolean switch to true', action='store_true', required=False, default=False)
    
    args = parser.parse_args()
    
    bottle.debug(args.debug)
    bottle.run(app=get_app(), host='localhost', port=args.port, quiet=False, reloader=True)




