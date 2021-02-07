//function to restapi
function youtubechannel() {
    $(".account").html("");
    $(".video-list").html("");

    //api key and channel id
    var channelID;
    var apikey = "AIzaSyA0WgfIfCkf5jH29PTupCkBi6lw8XnZySI";

    //function to get json from api channel id with search text
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + apikey + '&q=' + $('.search').val() + '', function (ytchan) {
        //save channel id 
        channelID = ytchan.items[0].snippet.channelId;
        var checkchannel = ytchan.items[0].id.kind;

        if (checkchannel === 'youtube#channel') {
            //add title images channel name
            $('.account').append(`
                <div class="animate__animated animate__fadeIn" style="width: 15rem; ">
                    <a href="https://www.youtube.com/channel/`+ channelID + `">
                    <img src="`+ ytchan.items[0].snippet.thumbnails.medium.url + `" class="card-img-top rounded-circle shadow p-1 mb-2 bg-white rounded" alt="...">
                    </a>
                    <div class="card-body text-center">
                        <p class="card-text font-weight-bold">`+ ytchan.items[0].snippet.title + `</p>
                        <hr>
                        <p class="card-text">`+ ytchan.items[0].snippet.description + `</p>
                    </div>
                </div>
                `);
        }
        
        //function to get lastest 4 video from channel
        $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + apikey + '&channelId=' + channelID + '&order=date&maxResults=4', function (videos) {
            var lastest = videos.items;
            $('.video-list').append(`
                <div class="col text-bold animate__animated animate__fadeIn">
                    <p class="font-weight-bold"> Lastest Video </p>
                    <hr>
                </div>
                <div class="col">
                    <div class="new-video row">
                      
                    </div>
                </div>
            `);

            //add videos from channel
            $.each(lastest, function (i, core) {
                $('.new-video').append(`
                <div class="col-sm-6">
                  <div class="card box shadow bg-white rounded mb-4">
                    <div class="embed-responsive embed-responsive-16by9 card-img-top">
                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/`+ core.id.videoId + `" allowfullscreen></iframe>
                    </div>
                    <div class="card-body">
                    <h6 class="card-title text-truncate">`+ core.snippet.title + `</h6>
                    </div>    
                  </div>
                </div>
                `);
            });

            $('.box').chainFade();
        });
    });
    $('.search').val('');
};


$('.sb-button').on('click', function () {
    youtubechannel();
});

$('#searc').on('keyup', function (e) {
    if (e.keyCode === 13) {
        youtubechannel();
    }
});



