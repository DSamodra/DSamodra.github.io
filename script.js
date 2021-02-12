//function to restapi
function youtubechannel() {
    $(".account").html("");
    $(".video-list").html("");

    //api key and channel id
    var channelID;
    var apikey = "AIzaSyA0WgfIfCkf5jH29PTupCkBi6lw8XnZySI";
    var looping;

    //function to get json from api channel id with search text
    $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + apikey + '&q=' + $('.search').val() + '', function (ytchan) {

        // lopping for getting channel name
        for (looping = 0; looping < 5; looping++) {
            // check if search is channel or videos
            var checkchannel = ytchan.items[looping].id.kind;
            if (checkchannel === 'youtube#channel') {

                // getting channel id
                channelID = ytchan.items[looping].snippet.channelId;

                //add title images channel name
                $('.account').append(`
                    <div class="col animate__animated animate__fadeIn container" style="width: 20rem; ">
                        <a href="https://www.youtube.com/channel/`+ channelID + `">
                        <img src="`+ ytchan.items[looping].snippet.thumbnails.high.url + `" class="card-img-top rounded-circle shadow-lg p-2 mb-2 bg-white rounded img-fluid" alt="...">
                        </a>
                        <div class="card-body text-center">
                            <p class="card-text font-weight-bold">`+ ytchan.items[looping].snippet.title + `</p>
                            <hr>
                            <p class="card-text">`+ ytchan.items[looping].snippet.description + `</p>
                        </div>
                    </div>
                    `);

                //function to get lastest 4 video from channel
                $.getJSON('https://www.googleapis.com/youtube/v3/search?part=snippet&key=' + apikey + '&channelId=' + channelID + '&order=date&maxResults=10', function (videos) {
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
                    var counter = 0;
                    $.each(lastest, function (i, core) {
                        if (core.snippet.description != '') {
                            $('.new-video').append(`
                                <div class="col-sm-6">
                                <div class="card box shadow bg-white rounded mb-4">
                                    <div class="embed-responsive embed-responsive-16by9 card-img-top">
                                    <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/`+ core.id.videoId + `" allowfullscreen></iframe>
                                    </div>
                                    <div class="card-body">
                                    <h6 class="card-title text-truncate font-weight-bold">`+ core.snippet.title + `</h6>
                                    </div>    
                                </div>
                                </div>
                            `);
                            counter++;
                        }
                        if (counter == 4) {
                            return false;
                        }
                    });
                    $('.box').chainFade();
                });
                break;
            } else {
                // if channel not found
            }
            // end if
        };
    });
    $('.search').val('');
};


// button function
$('.sb-button').on('click', function () {
    loading();
});

$('#searc').on('keyup', function (e) {
    if (e.keyCode === 13) {
        loading();
    }
});


// loading function
var myVar;
function loading() {
    document.getElementById("loader").style.display = "block";
    document.getElementById("main-konten").style.display = "none";

    myVar = setTimeout(showPage, 1000);
}

function showPage() {
    youtubechannel();
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-konten").style.display = "block";
}


