# Sequence overview
```mermaid
sequenceDiagram
    box Grey Server
        participant ERP
        participant WMS
        participant WES
        participant FMS
    end
    
    box Grey Onboard
        participant SSCS as Vehicle
        participant HW as Hardware
    end

    ERP->>WMS: Generate order
    WMS->>WES: Transport Request
    Note over WES: Segmentation and routing 
    WMS->>WES: Batch Transport Request
    WES->>FMS: Query Data
    Note over FMS: Navigation: <br> FMS calculates which exact paths <br>the vehicles are driving
    FMS-->>SSCS: Response Data
    SSCS-->>FMS: Processed Data
    FMS-->>WES: Display Data

    loop constant
        SSCS->>FMS : vehicle status
    end

```

## System definitions
Fleet management:
- Vehicle task management = what are all vehicles doing
- Vehicle traffic managmeent = where are all vehicles driving
- Vehicle energy management = how long can the vehicles still drive

- Vehicle assignment -> assign a vehicle to a task
- Vehicle navigation -> calculate the exact path a vehicle has to take to execute a task
- 




## System design flow
### Environment definition 
-> vehicle selection <br>
-> Segmentation <br>

### Logic definition
-> Order generation <br>
-> Vehicle assignment <br>
-> Energy managment <br>



1. Define the flows through the key areas in the warehouse
2. Define the area locations
3. Define how the flow should be triggered
3. Define any obstacles or transport behavior
4


```mermaid
flowchart LR
    subgraph Level 1
        direction LR
        A{Functional <br> warehouse areas}
        B[Inbound]
        C[Storage]
        D[Production]
        E[Outbound]
        
        A --> B
        A --> C
        A --> D
        A --> E

        F{Buffer?}
        B --> F
        C --> F
        D --> F
        E --> F

        F --yes--> Qwc

    end
``` 

# Transport definition
```mermaid
flowchart TD
    A[WMS]
    B[WES]
    C[FMS]
    D[SSCS]

    A -- Transport --> B
    B -- Mission --> C
    C -- Task --> D
```



## Point -> Point
```json
{
    "id":"Transport1",
    "sourcelocation": "INBOUND_1A",
    "destinationlocation": "PRODUCTION_2C"
    "load": {
        "id": "load_id",
        "type": "EURO"
    },
    "deadline": "2023-09-21T14:00:00Z"
}

```

## Point -> Area

```json
{
    "id":"Transport1",
    "sourcearea": "INBOUND_1",
    "destinationarea": "PRODUCTION_2"
    "load": {
        "id": "load_id",
        "type": "EURO"
    },
    "deadline": "2023-09-21T14:00:00Z"
}

```

# Mission definition
```mermaid
sequenceDiagram

    participant HostSystem
    participant FleetManager
    participant MissionScheduler
    participant Vehicle
    participant TaskExecutor
    participant Mission

    HostSystem-->>FleetManager: Send Mission
    FleetManager->>MissionScheduler: Schedule Mission
    MissionScheduler->>FleetManager: Mission Scheduled
    FleetManager->>Vehicle: Assign Mission
    Vehicle-->>FleetManager: Mission Assigned
    FleetManager->>Vehicle: Monitor Mission Progress
    loop Tasks Execution
        Vehicle->>TaskExecutor: Execute Task
        TaskExecutor->>Mission: Perform Task
        Mission-->>TaskExecutor: Task Completed
        TaskExecutor-->>Vehicle: Task Completed
    end
    Vehicle-->>FleetManager: Mission Completed
```	

```mermaid
block-beta
    block AGVFleetManager {
        block "Task Manager" as TaskManager
        block "Energy Manager" as EnergyManager
        block "Vehicle Controller" as VehicleController
    }
    AGVFleetManager -[hidden]- TaskManager : internal component
    AGVFleetManager -[hidden]- EnergyManager : internal component
    AGVFleetManager -[hidden]- VehicleController : internal component
    TaskManager -[hidden]-> "Host System" : interface
    EnergyManager -[hidden]-> "Charger" : interface

```
