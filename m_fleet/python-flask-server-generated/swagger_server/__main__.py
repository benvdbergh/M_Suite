#!/usr/bin/env python3

import connexion

from swagger_server import encoder


def main():
    try:
        app = connexion.App(__name__, specification_dir='./swagger/')
        app.app.json_encoder = encoder.JSONEncoder
        app.add_api('swagger.yaml', arguments={'title': 'VTS API'}, pythonic_params=True)
        app.run(port=8080)
    
    except(KeyboardInterrupt):
        pass

if __name__ == '__main__':
    main()
