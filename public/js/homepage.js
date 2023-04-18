$(() => {
    const redirectGroup = (event) => {
        const element = event.target;
        
        if (element.matches("p")) {
            document.location = `/group/${element.dataset.groupId}`
            // console.log(element.dataset.groupId);
        }
    }

    const redirectList = (event) => {
        const element = event.target;
        if (element.matches("p")) {
            document.location = `/list/${element.dataset.listId}`
            // console.log(element.dataset.groupId);
        }
    }

    // show group and list add forms
    function renderGroupForm() {
        $('#addGroup-div').children().removeClass('visually-hidden');
    };
    
    function renderListForm() {
        $('#addList-div').children().removeClass('visually-hidden');
    };

    // create new group
    async function createGroup(event) {
        event.preventDefault();

        const title = $('#group-title').val().trim();
        const description = $('#group-description').val().trim();
        const owning_user_id = $(this).data("user_id");

        if (title && owning_user_id) {
            const response = await fetch("/api/groups", {
              method: "POST",
              body: JSON.stringify({ title, description, owning_user_id}),
              headers: { "Content-Type": "application/json" },
            });

        if (response.ok) {
            location.reload();
        } else {
            alert("Failed to create a list.");
        }
        }
    };

    // delete group
    async function deleteGroup(event) {
        event.preventDefault();

        const group_id =  $('#delete-group').val();

        const response = await fetch(`/api/groups/${group_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
            location.reload();
        } else {
            alert("Failed to delete a list.");
        }
    
    };

    // create new list
    async function createList(event) {
        event.preventDefault();

        const title = $('#list-title').val().trim();
        const user_id = $(this).data("user_id");

        if (title) {
            const response = await fetch("/api/lists", {
              method: "POST",
              body: JSON.stringify({ title, user_id}),
              headers: { "Content-Type": "application/json" },
            });
      
            if (response.ok) {
              location.reload();
            } else {
              alert("Failed to create a list.");
            }
          }
    };
    
    // delete list
    async function deleteList(event) {
        event.preventDefault();

        const list_id =  $('#delete-list').val();

        const response = await fetch(`/api/lists/${list_id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
    
        if (response.ok) {
            location.reload();
        } else {
            alert("Failed to delete a list.");
        }
    
    };

    $('#new-group-btn').click(renderGroupForm);
    $('#new-list-btn').click(renderListForm);
    $('#new-list-form').submit(createList);
    $('#new-group-form').submit(createGroup);
    $('#list-delete-form').submit(deleteList);
    $('#group-delete-form').submit(deleteGroup);


    $('#groups-col').children().eq(4).click(redirectGroup);
    $('#lists-col').children().eq(4).click(redirectList);
});