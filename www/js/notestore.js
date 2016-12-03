var app  = angular.module('notes_app.storage',[]);

app.factory("notes_store",function(){
    var note_list = angular.fromJson(localStorage['notes'] || '[]');
    
    
    function persist(){
        localStorage['notes'] = angular.toJson(note_list);
    }
    
    return {
        list:function(){
            return note_list;
        },
        create:function(note){
            note_list.push(note);
            persist();
        },
        get:function(id){
            for(var i = 0; i < note_list.length;i++){
                if(note_list[i].id == id){
                    return note_list[i];
                }
            }
            return undefined;
        },
        edit:function(note){
            for(var i = 0; i < note_list.length;i++){
                if(note_list[i].id == note.id){
                    note_list[i] = note;
                }
            }
            persist();
        },
        remove:function(noteId){
            for(var note = 0; note < note_list.length;note++){
                if(note_list[note].id==noteId){
//                    array.splice("position","number of elements to remove")
                    note_list.splice(note,1);
                    persist();
                    return;
                }
            }
        },
        move:function(note,fromIndex,toIndex){
            // this will cut the current element
            note_list.splice(fromIndex,1);
            
            // this will remove nothing but add the not at that place
            note_list.splice(toIndex,0,note);
            
            persist();
        } 
    };
});
