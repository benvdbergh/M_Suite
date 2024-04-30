#!/bin/bash

# Create the routing_service directory
mkdir -p M_Suite/m_fleet/routing_service/src
mkdir -p M_Suite/m_fleet/routing_service/data
mkdir -p M_Suite/m_fleet/routing_service/config
mkdir -p M_Suite/m_fleet/routing_service/tests

# Create the required files
touch M_Suite/m_fleet/routing_service/src/main.py
touch M_Suite/m_fleet/routing_service/src/routing_algorithm.py
touch M_Suite/m_fleet/routing_service/src/agv.py
touch M_Suite/m_fleet/routing_service/src/graph.py
touch M_Suite/m_fleet/routing_service/src/neo4j_connector.py

touch M_Suite/m_fleet/routing_service/data/map_data.json
touch M_Suite/m_fleet/routing_service/data/task_priorities.json

touch M_Suite/m_fleet/routing_service/config/config.py

touch M_Suite/m_fleet/routing_service/tests/test_routing_algorithm.py
touch M_Suite/m_fleet/routing_service/tests/test_neo4j_connector.py

touch M_Suite/m_fleet/routing_service/requirements.txt
touch M_Suite/m_fleet/routing_service/README.md