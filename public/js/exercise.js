//model
class ExercisePage {
    constructor(){
        this.noteblocks = [];
        this.teacherFeedback = '';
        this.teacherGrade = '';
        this.topic = '';
        this.subject = '';
        this.id = 0
    }

    createNoteblockId(id){
        if(id>0)
            return id;
        if(this.noteblocks.length == 0)
            return 1;
        return this.noteblocks[this.noteblocks.length-1].id + 1;
    }

    removeNoteblock(id){
        for(var i=this.noteblocks.length-1; i>=0; i--){
            if(this.noteblocks[i].id === id){
                this.noteblocks.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    addNoteblockTextarea(id){
        var newNoteblock = {
            id: this.createNoteblockId(id),
            seq: this.noteblocks.length - 1,
            type: 'text',
            content: ''
        };        
        this.noteblocks.push(newNoteblock);
        return newNoteblock;
    }

    addNoteblockImage(id){
        var newNoteblock = {
            id: this.createNoteblockId(id),
            seq: this.noteblocks.length - 1,
            type: 'image',
            image: ''
        };
        this.noteblocks.push(newNoteblock);
        return newNoteblock;
    }

    getNoteblock(id){
        for(var i=this.noteblocks.length-1; i>=0; i--){
            if(this.noteblocks[i].id === id) return this.noteblocks[i];
        }
        return null;
    }
}

const mode = 'student';
const exercise1 = new ExercisePage();

function saveexercise(){
    exercise1.topic = $('#topic').val();
    exercise1.subject = $('#subject').val();
    console.log(exercise1);
    const response = $.ajax({
        url: '/api/exercises/'+exercise1.id, 
        method: 'PUT',
        data: exercise1
    }).done(
        function(data){
            alert("Save sucessfully");
        }
    ).fail(function(data) {
        console.error(data.responseJSON.message);
        $('#invalid').html(data.responseJSON.message);
        $('#invalid').show();
    });
}

//controllers
function editNoteblockTextArea(id){
    var noteblock = exercise1.getNoteblock(id);
    if(!noteblock){
        console.error('Cannot find the noteblock by id: '+id);
        return;
    }
    $('#noteblock-' + id + '-display').hide();
    $('#noteblock-' + id + '-textarea').val(noteblock.content);
    $('#noteblock-' + id + '-edit').show();
}

function editNoteblockImage(id){
    var noteblock = exercise1.getNoteblock(id);
    if(!noteblock){
        console.error('Cannot find the noteblock by id: '+id);
        return;
    }
    $('#noteblock-' + id + '-display').hide();
    $('#noteblock-' + id + '-file').val('');
    $('#noteblock-' + id + '-editimage').attr('src', noteblock.image);
    $('#noteblock-' + id + '-edit').show();
}

function cancelNoteblock(id){
    if(confirm("Are you sure to cancel the change of note?")){
        $('#noteblock-' + id + '-edit').hide();
        $('#noteblock-' + id + '-display').show();
    }
}

function saveNoteblockTextArea(id){
    var noteblock = exercise1.getNoteblock(id);
    if(!noteblock){
        console.error('Cannot find the noteblock by id: '+id);
        return;
    }
    $('#noteblock-' + id + '-edit').hide();
    noteblock.content = $('#noteblock-' + id + '-textarea').val();
    $('#noteblock-' + id + '-displaytext').html(noteblock.content);
    $('#noteblock-' + id + '-display').show();
}

function saveTeacherFeedback(){
    exercise1.teacherFeedback = $('#teacher-feedback-textarea').val();
    exercise1.teacherGrade = $('#teacher-grade').val();
    $('#teacher-feedback-displaytext').html(exercise1.teacherFeedback);    
    alert('The teacher feedback is saved successfully');
}

function cancelTeacherFeedback(){
    if(confirm("Are you sure to cancel the change of Teacher feedback?")){
        $('#teacher-feedback-textarea').val(exercise1.teacherFeedback);
        $('#teacher-grade').val(exercise1.teacherGrade);
    }
}

function removeNoteblock(id){
    if(confirm("Are you sure to remove this note?")){
        var noteblock = exercise1.removeNoteblock(id);
        if(!noteblock){
            console.error('Cannot remove the noteblock by id: '+id);
            return;
        }
        $('#noteblock-' + id).remove();
    }
}

//view
function addNoteblockTextarea(id = 0){
    var noteblock = exercise1.addNoteblockTextarea(id);
    const templateHtml = `<div class="card" id="noteblock-` + noteblock.id + `">
    <div class="card-body">
        <div id="noteblock-` + noteblock.id + `-display" class="noteblock-display" style="display: none;">
            <p id="noteblock-` + noteblock.id + `-displaytext" class="card-text noteblock-text"></p>
            <button type="button" class="noteblock-button noteblock-button-bin" onclick="removeNoteblock(` + noteblock.id + `)"></button>
            <button type="button" class="noteblock-button noteblock-button-edit" onclick="editNoteblockTextArea(` + noteblock.id + `)"></button>
        </div>
        <div id="noteblock-` + noteblock.id + `-edit" class="noteblock-edit">
            <textarea id="noteblock-` + noteblock.id + `-textarea"></textarea>
            <button type="button" class="noteblock-button noteblock-button-cancel" onclick="cancelNoteblock(` + noteblock.id + `)"></button>
            <button type="button" class="noteblock-button noteblock-button-save" onclick="saveNoteblockTextArea(` + noteblock.id + `)"></button>
        </div>
    </div>
</div>`;
    $('#student-section').append(templateHtml);
    return noteblock;
}

function addNoteblockImage(id = 0){
    var noteblock = exercise1.addNoteblockImage(id);
    const templateHtml = `<div class="card" id="noteblock-` + noteblock.id + `">
    <div class="card-body">
        <div id="noteblock-` + noteblock.id + `-display" class="noteblock-display" style="display: none;">
            <img id="noteblock-` + noteblock.id + `-displayimage" class="card-img-top noteblock-image">
            <button type="button" class="noteblock-button noteblock-button-bin" onclick="removeNoteblock(` + noteblock.id + `)"></button>
            <button type="button" class="noteblock-button noteblock-button-edit" onclick="editNoteblockImage(` + noteblock.id + `)"></button>
        </div>
        <div id="noteblock-` + noteblock.id + `-edit" class="noteblock-edit">
            <img id="noteblock-` + noteblock.id + `-editimage" class="card-img-top noteblock-image">
            <input id="noteblock-` + noteblock.id + `-file" type="file" accept="image/*" onchange='previewNoteblockImage(event, ` + noteblock.id + `)'>
            <button type="button" class="noteblock-button noteblock-button-cancel" onclick="cancelNoteblock(` + noteblock.id + `)"></button>
            <button type="button" class="noteblock-button noteblock-button-save" onclick="saveNoteblockImage(` + noteblock.id + `)"></button>
        </div>
    </div>
</div>`;
    $('#student-section').append(templateHtml);
    return noteblock;
}

function previewNoteblockImage(event, id){
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
        const preview = document.getElementById('noteblock-'+id+'-editimage');
        preview.src = reader.result;
    };
}

function saveNoteblockImage(id){
    var noteblock = exercise1.getNoteblock(id);
    if(!noteblock){
        console.error('Cannot find the noteblock by id: '+id);
        return;
    }
    $('#noteblock-' + id + '-edit').hide();
    noteblock.image = $('#noteblock-' + id + '-editimage').attr('src');
    $('#noteblock-' + id + '-displayimage').attr('src', noteblock.image);
    $('#noteblock-' + id + '-display').show();
}

function changeMode(mode){
    if(mode == 'student'){
        $('.noteblock-button').show();
        $('.noteblock-edit').hide();
        $('.noteblock-display').show();
        $('.teacher-button').hide();
        $('#teacher-feedback-textarea').hide();
        $('#teacher-feedback-displaytext').show();
        $('#teacher-grade').prop('disabled', true);
    }else if(mode == 'teacher'){
        $('.noteblock-edit').hide();
        $('.noteblock-display').show();
        $('.noteblock-button').hide();
        $('#teacher-feedback-displaytext').hide();
        $('#teacher-feedback-textarea').show();
        $('#teacher-grade').prop('disabled', false);
        $('.teacher-button').show();
    }
}

function newExercise(){
    changeMode('student');
    addNoteblockTextarea();
}

function initExercise(exerciseBook, userRole){
    exercise1.id = exerciseBook.id;
    exercise1.teacherFeedback = exerciseBook.feedback;
    exercise1.teacherGrade = exerciseBook.grade;
    exercise1.topic = exerciseBook.topic;
    exercise1.subject = exerciseBook.subject_id;
    for(var i=0; i<exerciseBook.pages.length; i++){        
        var ebPage = exerciseBook.pages[i];
        switch(ebPage.content_type){
            case 't':                
                var block = addNoteblockTextarea(ebPage.id);
                block.content = ebPage.content;
                break;
            case 'i':
                var block = addNoteblockImage(ebPage.id);
                block.image = ebPage.content;
                break;
        }
    }
    renderView();
    changeMode(userRole);
}

function renderView(){
    console.log(exercise1);
    $('#teacher-feedback-displaytext').html(exercise1.teacherFeedback);
    $('#teacher-feedback-textarea').val(exercise1.teacherFeedback);    
    $('#teacher-grade').val(exercise1.teacherGrade);
    $('#teacher-grade').val(exercise1.teacherGrade);
    $('#topic').val(exercise1.topic);
    $('#subject').val(exercise1.subject);
    
    for(var i=0; i<exercise1.noteblocks.length; i++){
        var noteblock = exercise1.noteblocks[i];
        switch(noteblock.type){
            case 'text':
                $('#noteblock-' + noteblock.id + '-displaytext').html(noteblock.content);
                $('#noteblock-' + noteblock.id + '-textarea').val(noteblock.content);
                break;
            case 'image':
                $('#noteblock-' + noteblock.id + '-displayimage').attr('src', noteblock.image);
                $('#noteblock-' + noteblock.id + '-editimage').attr('src', noteblock.image);
                break;
            default:
                console.log('Not support: '+noteblock.type);
        }
    }
}