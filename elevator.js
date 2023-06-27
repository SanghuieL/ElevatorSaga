{
    init: function(elevators, floors) {
        var num_elevator = elevators.length;
        var num_floor = floors.length;
        
        for (var i = 0; i < num_elevator; i++) {
        // Whenever the elevator is idle (has no more queued destinations) ...
            elevators[i].on("idle", function() {
                for (var j = 0; j < num_floor; j++) {
                    if (this.getPressedFloors().length > 0) {
                        this.goToFloor(this.getPressedFloors()[0])
                    } else if (this.loadFactor() === 0) {
                        this.goToFloor(0);
                    } else {
                        this.goToFloor(j);
                    }
                }
            });
            elevators[i].on("floor_button_pressed", function(floorNum) { 
                if (this.loadFactor() === 0) {
                    this.GoToFloor(0);
                }
                if ((this.getPressedFloors().length > 0)) {
                    if (this.loadFactor() === 0) {
                        this.goToFloor(0);
                    } else {
                        this.goToFloor(this.getPressedFloors()[0]);
                    }
                }    
            } );
            elevators[i].on("passing_floor", function(floorNum, direction) { 
                if(this.getPressedFloors().includes(floorNum)){
                    this.goToFloor(floorNum);
                }
            });
            
        };
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
