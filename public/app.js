const receiveEntry = function () {

    $.getJSON('/api/applist').then(function (data) {
        const variable = data.map((element) =>
            `<input type="checkbox" class="checkbox" ${element.completed ? 'checked' : ''} data-id=${element._id}></input>
                <li>${element.item}</li>
                <i class="far fa-circle" id='${element._id}'></i><br>`)
        $('#todolistapp').html(variable);
        $('.fa-circle').on('click', dataDeleted);
        $('.checkbox').on('click', function (event) {
            const ID = $(event.target).attr('data-id');
            $.ajax({ url: `/api/update/${ID}`, method: 'PUT' })
                .then(function (res) {
                    receiveEntry();
                })
                .catch(function (err) {
                    alert(err);
                })
        })
    })
}

const socket = io();
const dataSubmitted = function (event) {
    event.preventDefault();
    const data = $('input').val().trim();
    $.ajax({ url: "/add", method: "POST", data: { item: data } }).then(function (res) {
        socket.emit('new-message', { res });
        console.log(res);
        receiveEntry();
    });
}

const dataDeleted = function (event) {
    event.preventDefault();
    const id = event.target.id;
    $.ajax({ url: `/delete/${id}`, method: "DELETE" }).then(function () {
        receiveEntry();
    });
}

socket.on('emit-message', function (data) {
    console.log(data);
    let todolistitem = (`<input type="checkbox" class="checkbox"></input>
    <li>${data.item}</li>
    <i class="far fa-circle" id='${data._id}'></i><br>`)
    $('#todolistapp').append(todolistitem);
})

receiveEntry();

$('form').on('submit', dataSubmitted);