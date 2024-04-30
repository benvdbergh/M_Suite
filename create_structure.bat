@echo off

:: Create the routing_service directory
mkdir M_Suite\m_fleet\routing_service\src
mkdir M_Suite\m_fleet\routing_service\data
mkdir M_Suite\m_fleet\routing_service\config
mkdir M_Suite\m_fleet\routing_service\tests

:: Create the required files
type nul > M_Suite\m_fleet\routing_service\src\main.py
type nul > M_Suite\m_fleet\routing_service\src\routing_algorithm.py
type nul > M_Suite\m_fleet\routing_service\src\agv.py
type nul > M_Suite\m_fleet\routing_service\src\graph.py
type nul > M_Suite\m_fleet\routing_service\src\neo4j_connector.py

type nul > M_Suite\m_fleet\routing_service\data\map_data.json
type nul > M_Suite\m_fleet\routing_service\data\task_priorities.json

type nul > M_Suite\m_fleet\routing_service\config\config.py

type nul > M_Suite\m_fleet\routing_service\tests\test_routing_algorithm.py
type nul > M_Suite\m_fleet\routing_service\tests\test_neo4j_connector.py

type nul > M_Suite\m_fleet\routing_service\requirements.txt
type nul > M_Suite\m_fleet\routing_service\README.md

echo Folder structure and files created successfully.