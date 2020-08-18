$(document).ready(async function() {

    //MAIN TRENDI DUZELT TECILI
    //HERSEYI TEST ELE
    //BUTUN XEBERLERIN HASHTAGINE HREF QOY
    //DAVAY MEN YATDIM GECEN XEYRE

    if(window.location.pathname === "/") {
        localStorage.removeItem('order');
        localStorage.removeItem('category');
    }

    /////////////////////////
    //// NEWS PAGINATION ///
    ///////////////////////
    let limit = 1;

    //GETTING ALL NEWS
    let allNews = await axios
    .get(`${window.development}/api/get-all-news`)
    .then(res => res.data.allNews);

    allNews.map(a => {
        $("#news-wrapper").append(`
            <div class="col-12 mb-4 p-0 d-flex flex-column flex-sm-row news-box" style="background: #1D1E29;">
                <div class="col-12 col-sm-6 p-0 news-img-box" style="background: #1D1E29; height: 200px;">
                    <img src="${a.image}" data-id="${a._id}" alt="" style="border-radius: 5px 0 0 5px;">
                    <div class="news-emoji">
                        <div class="emoji-1 emoji-box">
                            <img src="/emotion-img/${a.hashtag1}.svg" class="emoji-1-img" alt="">
                        </div>
                        <div class="emoji-2 emoji-box">
                            <img src="/emotion-img/${a.hashtag2}.svg" class="emoji-2-img" alt="">
                        </div>
                    </div>
                    <div class="news-view-count d-flex align-items-center">
                        <i class="far fa-eye"></i>
                        <span>${a.pageViews}</span>
                    </div>
                </div>
                <div class="col-12 col-sm-6 py-3 px-4" style="background: #1D1E29; border-radius: 0 5px 5px 0;">
                    <div class="hashtag">
                        <a href="#">${a.hashtag1}</a>
                        <a href="#">${a.hashtag2}</a>
                    </div>
                    <div class="news-header">
                        <h5 id="news-header" data-id="${a._id}" data-header-text="${a.newsHeader}" data-description-text="${a.newsDescription}" data-name="${a.authorName}" data-author-image="${a.authorImage}" data-news-image="${a.image}" data-hashtag1="${a.hashtag1}" data-hashtag2="${a.hashtag2}" data-news-date="${a.date}">${a.newsHeader}</h5>
                    </div>
                    <div class="news-author d-flex">
                        <div class="author-avatar">
                            <img src="${a.authorImage}" alt="">
                        </div>
                        By
                        <div class="author-name">
                            <a href="#">${a.authorName}</a>
                        </div>
                        <div class="news-date">
                            <span>${moment(`${a.date}`).fromNow()}</span>
                        </div>
                    </div>
                </div>
            </div>
        `)
    });
    if(limit >= 1) {
        $("#load-more-btn").click(function() {
            $(".load-more-btn-img").css("display", 'flex');
            setTimeout(async () => {
                $(".load-more-btn-img").css("display", 'none');
                limit += 1;
                $(".news-box").remove();
                let newsPagination = await axios
                .get(`${window.development}/api/news?page=${limit}`)
                .then(res => res.data.newsPagination);

                newsPagination.map(n => {
                    $("#news-wrapper").append(`
                        <div class="col-12 mb-4 p-0 d-flex flex-column flex-sm-row news-box" style="background: #1D1E29;">
                            <div class="col-12 col-sm-6 p-0 news-img-box" style="background: #1D1E29; height: 200px;">
                                <img src="${n.image}" data-id="${n._id}" alt="" style="border-radius: 5px 0 0 5px;">
                                <div class="news-emoji">
                                    <div class="emoji-1 emoji-box">
                                        <img src="/emotion-img/${n.hashtag1}.svg" class="emoji-1-img" alt="">
                                    </div>
                                    <div class="emoji-2 emoji-box">
                                        <img src="/emotion-img/${n.hashtag2}.svg" class="emoji-2-img" alt="">
                                    </div>
                                </div>
                                <div class="news-view-count d-flex align-items-center">
                                    <i class="far fa-eye"></i>
                                    <span>${n.pageViews}</span>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 py-3 px-4" style="background: #1D1E29; border-radius: 0 5px 5px 0;">
                                <div class="hashtag">
                                    <a href="#">${n.hashtag1}</a>
                                    <a href="#">${n.hashtag2}</a>
                                </div>
                                <div class="news-header">
                                    <h5 id="news-header" data-id="${n._id}">${n.newsHeader}</h5>
                                </div>
                                <div class="news-author d-flex">
                                    <div class="author-avatar">
                                        <img src="${n.authorImage}" alt="">
                                    </div>
                                    By
                                    <div class="author-name">
                                        <a href="#">${n.authorName}</a>
                                    </div>
                                    <div class="news-date">
                                        <span>${moment(`${n.date}`).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                });
                ////CLOSING LOAD MORE BUTTON
                let allNewsLength = await axios.get(`${window.development}/api/all-news`).then(res => res.data.allNews);
                if(allNews.length * limit >= allNewsLength.length) {
                    $("#load-more-btn").css("display", "none");
                }
            }, 3000);
        });
    }


    //RIGHT TREND APPEND
    let rightTrend = await axios
    .get(`${window.development}/api/right-trend`)
    .then(res => res.data.rightTrend);
    
    rightTrend.map((r, i) => {
        $(".right-trend").append(`
            <div class="col-12 p-0 d-flex flex-column mb-3" id="right-news" data-id="${r._id}">
                <div class="img" style="background-image: url(${r.image});">
                    <h2 class="number">${i + 1}</h2>
                </div>
                <span>${r.newsHeader}</span>
            </div>
        `)
    });

    //MAIN TREND APPENDING
    let allNewsForMainTrend = await axios.get(`${window.development}/api/all-news`).then(res => res.data.allNews);
    ///////////////////////////////
    //  BURANI DUZELT //
    ///////////////////////////
    let mainTrend1 = allNewsForMainTrend[allNewsForMainTrend.length - 5];
    let mainTrend2 = allNewsForMainTrend[allNewsForMainTrend.length - 4];
    let mainTrend3 = allNewsForMainTrend[allNewsForMainTrend.length - 3];
    let mainTrend4 = allNewsForMainTrend[allNewsForMainTrend.length - 2];
    let mainTrend5 = allNewsForMainTrend[allNewsForMainTrend.length - 1];

    console.log(allNewsForMainTrend);

    //First trend
    $('.trend-1 .emoji-1-img').attr('src', `/emotion-img/${mainTrend1.hashtag1}.svg`);
    $('.trend-1 .emoji-2-img').attr('src', `/emotion-img/${mainTrend1.hashtag2}.svg`);
    $(".trend-1").attr('data-id', `${mainTrend1._id}`);
    $(".trend-1").attr('style', `background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${mainTrend1.image})`);
    $("#trend-1-header").text(mainTrend1.newsHeader);
    $("#trend-1-author").text(mainTrend1.authorName);
    $("#trend-1-views").text(mainTrend1.pageViews);
    //Second trend
    $('.trend-2 .emoji-1-img').attr('src', `/emotion-img/${mainTrend2.hashtag1}.svg`);
    $('.trend-2 .emoji-2-img').attr('src', `/emotion-img/${mainTrend2.hashtag2}.svg`);
    $(".trend-2").attr('data-id', `${mainTrend2._id}`);
    $(".trend-2").attr('style', `background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${mainTrend2.image})`);
    $("#trend-2-header").text(mainTrend2.newsHeader);
    $("#trend-2-author").text(mainTrend2.authorName);
    $("#trend-2-views").text(mainTrend2.pageViews);
    //Third trend
    $('.trend-3 .emoji-1-img').attr('src', `/emotion-img/${mainTrend3.hashtag1}.svg`);
    $('.trend-3 .emoji-2-img').attr('src', `/emotion-img/${mainTrend3.hashtag2}.svg`);
    $(".trend-3").attr('data-id', `${mainTrend3._id}`);
    $(".trend-3").attr('style', `background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${mainTrend3.image})`);
    $("#trend-3-header").text(mainTrend3.newsHeader);
    $("#trend-3-author").text(mainTrend3.authorName);
    $("#trend-3-views").text(mainTrend3.pageViews);
    //Fourt trend
    $('.trend-4 .emoji-1-img').attr('src', `/emotion-img/${mainTrend4.hashtag1}.svg`);
    $('.trend-4 .emoji-2-img').attr('src', `/emotion-img/${mainTrend4.hashtag2}.svg`);
    $(".trend-4").attr('data-id', `${mainTrend4._id}`);
    $(".trend-4").attr('style', `background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${mainTrend4.image})`);
    $("#trend-4-header").text(mainTrend4.newsHeader);
    $("#trend-4-author").text(mainTrend4.authorName);
    $("#trend-4-views").text(mainTrend4.pageViews);
    //Fifth trend
    $('.trend-5 .emoji-1-img').attr('src', `/emotion-img/${mainTrend5.hashtag1}.svg`);
    $('.trend-5 .emoji-2-img').attr('src', `/emotion-img/${mainTrend5.hashtag2}.svg`);
    $(".trend-5").attr('data-id', `${mainTrend5._id}`);
    $(".trend-5").attr('style', `background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${mainTrend5.image})`);
    $("#trend-5-header").text(mainTrend5.newsHeader);
    $("#trend-5-author").text(mainTrend5.authorName);
    $("#trend-5-views").text(mainTrend5.pageViews);


    //GETTING USER INFORMATION FROM LOCAL STORAGE
    let tokenMe = localStorage.getItem('user');
    if(tokenMe) {
        let userData = parseJwt(tokenMe);
        let user = userData.usr;
        let userName = user.username;
        let userImage = user.image;

        let userProfileToggle = false;
        //user profile image gives
        $("#user-profile").css('background-image', `url(${userImage})`);
        $("#user-profile-modal").css("display", "none");
        //give username to user-profile
        $("#user-profile-username").text(userName);
        //user-profile modal opening and closing
        $("#user-profile").click(function() {
            if(userProfileToggle === false) {
                $("#user-profile-modal").slideDown(300);
                userProfileToggle = true;
            } else {
                $("#user-profile-modal").slideUp(300);
                userProfileToggle = false;
            }
        });
        $(document).on('click', function(e) {
            if(!(($(e.target).closest("#user-profile-modal").length > 0 ) ||
            ($(e.target).closest("#user-profile").length > 0 ))) {
                $("#user-profile-modal").slideUp(300);
                userProfileToggle = false;
            }
        });
    } else {
        $("#dash-login-btn").css("display", "flex");
    }

    //Main trend link
    let formData = {}
    $(".trend").click(async function() {
        let id = $(this).data('id');
        localStorage.setItem('newsID', id);

        formData.pageViews = allNews.filter(a => a._id === id)[0].pageViews + 1;
    
        await axios
        .put(`${window.development}/api/update-page-views/${id}`, formData)
        window.location.href = `/news/${id}`;

    });
    //News header text link
    $(document).on('click', '.news-box img, #news-header', async function() {
        let id = $(this).data('id');
        localStorage.setItem('newsID', id);

        formData.pageViews = allNews.filter(a => a._id === id)[0].pageViews + 1;
    
        await axios
        .put(`${window.development}/api/update-page-views/${id}`, formData)
        window.location.href = `/news/${id}`;
    });
    //right trend link
    $(document).on('click', '#right-news', async function() {
        let id = $(this).data('id');
        localStorage.setItem('newsID', id);

        formData.pageViews = rightTrend.filter(a => a._id === id)[0].pageViews + 1;
    
        await axios
        .put(`${window.development}/api/update-page-views/${id}`, formData)
        window.location.href = `/news/${id}`;
    });

    ///SECTION LINK///
    $(".sections-li").click(function() {
        let sectionVal = {
            name: $(this).text(),
            val: $(this).data('section-val')
        }
        localStorage.setItem('category', JSON.stringify(sectionVal));
    });

});
// jwt parse
function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
    atob(base64)
        .split("")
        .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
}