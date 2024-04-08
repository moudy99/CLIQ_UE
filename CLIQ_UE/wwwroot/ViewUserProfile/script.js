"use strict";


const profile_pic = document.querySelector('.profile-pic');
const searchInput = document.querySelector('.nav-content .search-bar .search-input');
const notification_icon = document.querySelector('.nav-content .right-items .items .notification i');
const more_options = document.querySelector('.nav-content .right-items .profile-box .profile-name');

const btn_chat = document.querySelector('.chat');
const btn_group = document.querySelector('.group');
const btn_settings = document.querySelector('.Settings');
const btn_home = document.querySelector('.home');

//! add post !//
const add_post_form = document.querySelector(".add-post-form")
const add_post_img = document.querySelector('.add-post-img');
const add_post_text = document.querySelector('#write-post-text');
const btn_emoji = document.querySelector('.emoji-btn');
const btn_has = document.querySelector('.hash-btn'); // Corrected selector
const btn_select_img = document.querySelector('.img-btn');
const btn_post = document.querySelector('.add-post .right .post-btn');
const privacyDropdown = document.getElementById('privacyDropdown');
//const dropdownMenu = privacyDropdown.nextElementSibling;
let privacy_value = 'public';


//! Post Box !//
const post_container = document.querySelector('.posts-container');
const post_time = document.querySelector('.post-time')
const btn_post_options = document.querySelector('.more-options-icon');
const btn_like_icon = document.querySelector('.like-icon');
const like_number = document.querySelector('.like-numbers');
const btn_dislike_icon = document.querySelector('.dislike-icon i');
const dislike_number = document.querySelector('.dislike-numbers');
const btn_repost_icon = document.querySelector('.repost-icon i');
const repost_number = document.querySelector('.repost-numbers')
const btn_comment_icon = document.querySelector('.comment-icon i');
const comment_number = document.querySelector('.comment-numbers');
const btn_add_comment = document.querySelector('.add-comment-icon');
const btn_all_comment_ = document.querySelector('.posts-container .post .box .post-content a');
const postDate = new Date('2024-03-30T12:00:00');
const posted_at = document.querySelector('.post-time');
const views_number = document.querySelector('.post-views');
const post_text = document.querySelector('.post-text');
const post_img = document.querySelector('.post-imgs');
const post_video = document.querySelector('.post-video')
// *Comment =+> 
const comment_text = document.querySelector('.comment-text');
const add_comment = document.querySelector('.add-comment-icon')
const comments_number = document.querySelector('.post-comments');

// Drop Down menu
const logout = document.querySelector(".logout")

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', function () {
        const inputValue = searchInput.value.trim();
        if (inputValue.length > 0) {
            searchInput.value = '';
        }
    });
});



// Notification menu
document.getElementById('notification-icon').addEventListener('click', function (event) {
    event.stopPropagation();
    document.getElementById('notification-container').classList.toggle('active');
});

document.body.addEventListener('click', function (event) {
    if (!event.target.closest('#notification-container')) {
        document.getElementById('notification-container').classList.remove('active');
    }
});


//! Toggle profile menu 

document.addEventListener('DOMContentLoaded', function () {
    const profileBox = document.getElementById('profile-box');
    const dropdownMenu = document.getElementById('dropdown-menu');

    profileBox.addEventListener('click', function (event) {
        event.stopPropagation();
        profileBox.classList.toggle('active');
    });

    // Close the dropdown menu when clicking outside 
    document.addEventListener('click', function () {
        profileBox.classList.remove('active');
    });

    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            const action = this.getAttribute('data-action');
            console.log('Clicked on:', action);
        });
    });
});






// ! Add post date func ==>
function calculatePostTime(postDateAttr) {
    const postDate = new Date(postDateAttr);

    //console.log(`THis is the date that i convert to ${postDate} `)
    //console.log(`THis is the date converting ${postDateAttr} `)

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const timeDifference = currentDate.getTime() - postDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);


    if (daysDifference < 1) {
        if (hoursDifference < 1) {
            if (minutesDifference < 1) {
                return 'Just now';
            } else if (minutesDifference === 1) {
                return '1m';
            } else {
                return `${minutesDifference}m`;
            }
        } else if (hoursDifference === 1) {
            return '1h';
        } else {
            return `${hoursDifference}h`;
        }
    } else if (daysDifference === 1) {
        return '1d';
    } else if (daysDifference < 7) {
        return `${daysDifference}d`;
    } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return postDate.toLocaleDateString('en-US', options);
    }
}


function updatePostTime(postElement) {
    const postDateAttr = postElement.getAttribute('data-post-date');
    const timeText = calculatePostTime(postDateAttr);

    const posted_at = postElement.querySelector('.post-time');
    posted_at.textContent = timeText;
}


const postElements = document.querySelectorAll('.post');

postElements.forEach(postElement => {
    updatePostTime(postElement);
});


function isArabic(text) {
    const arabicRange = /[\u0600-\u06FF]/;
    return arabicRange.test(text);
}

// Function to set direction and text alignment based on text language
function setTextDirection(textContainer, text) {
    if (text && isArabic(text.replace(/[^\u0600-\u06FF]/g, ''))) {
        console.log("THE TEXT is Arabic");
        textContainer.style.direction = 'rtl';
        textContainer.style.textAlign = 'right';
    } else {
        console.log("THE TEXT is Not Arabic");
        textContainer.style.direction = 'ltr';
        textContainer.style.textAlign = 'left';
    }
}




/////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////Load ALL POSTES /////////////////////////////////////////////////////////////////
const timelineCategories = document.querySelectorAll('.timeline .list');

let pageIndex = 0;

let userId = document.getElementById('userId').getAttribute('data-user-id');


function fetchPosts(pageIndex) {
    console.log(userId)
    fetch(`/ViewUserProfile/GetPosts?userId=${userId}&pageIndex=${pageIndex}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        })
        .then(Model => {
            displayPosts(Model);
        })
        .catch(error => {
            console.error('Error :', error);
        });
}


////////////////////////////////// TIme Line Gallery =====> 
timelineCategories.forEach(category => {
    category.addEventListener('click', function () {
        const filter = this.dataset.filter;

        timelineCategories.forEach(cat => {
            cat.classList.remove('active');
        });

        this.classList.add('active');


        fetchContent(filter);
    });
});

function fetchImages() {
    console.log(userId)
    fetch(`/ViewUserProfile/GetPostsImages?userId=${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch images');
            }
            return response.json();
        })
        .then(images => {
            displayImagesInGallery(images);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayImagesInGallery(images) {
    const galleryContainer = document.createElement('div');
    galleryContainer.classList.add('gallery');

    images.forEach(image => {
        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.alt = 'Photo';
        galleryContainer.appendChild(imageElement);
    });

    post_container.appendChild(galleryContainer);
}
function fetchContent(filter) {

    if (filter === 'ALL') {
        post_container.innerHTML = "";
        fetchPosts(pageIndex);
        console.log("All")

    } else if (filter === 'Photos') {
        post_container.innerHTML = "";
        fetchImages()
        console.log("Images")

    }
}



// Function to display posts
function displayPosts(Model) {
    Model.posts.forEach(post => {
        let postHtml = `
            <div class="post" data-post-date="Just now">
                <div class="box">
                    <div class="top">
                        <!-- Profile -- views -->
                        <div class="profile">
                            <img class="profile-pic" src="${post.user.personalImage}"  alt="Profile image">
                            <div class="name">
                                <p class="username">${post.user.userName} <i class="bi bi-patch-check-fill text-primary"></i> </p>
                                <!-- Using js function to calculate the time -->
                                <p class="post-time">${post.postAddedTime}</p>
                            </div>
                        </div>
                        <div class="views">
                            <div class="views-number">
                                <i class="fa-solid fa-eye"></i>
                                <p>${post.viewsCount}</p>
                            </div>
                            <div class="more-options">
                                <i class="fa-solid fa-ellipsis more-options-icon"></i>
                            </div>
                        </div>
                    </div>
                    <!-- Post Content -->
                    <div class="post-content">
                        ${post.textContent ? `<p>${post.textContent}</p>` : ''}
                        <div class="post-img">
                            ${post.postImage ? `<img src="${post.postImage}" alt="Post Image">` : ''}
                        </div>
                        <div class="interactions">
                        <div class="interactions-container">
                              <div class="box">
                                <i class="fa-solid fa-heart like-icon"></i>
                                <span>${post.likeCount}</span>
                            </div>
                            <div class="box">
                                <i class="fa-solid fa-thumbs-down dislike-icon"></i>
                                <span>${post.dislikeCount}</span>
                            </div>
                            <div class="box">
                                <i class="fa-solid fa-retweet repost-icon"></i>
                                <span>${post.repostCount}</span>
                            </div>
                            <div class="box">
                                <i class="fa-solid fa-comment comment-icon" onclick="getPostComments(${post.id})"></i>
                                <span>${post.commentCount}</span>
                            </div>
                        </div>

                                <i class="bi bi-bookmark-fill"></i>
                        </div>
                        ${post.commentCount > 2 ? `<a href="#">View <span>${post.commentCount}</span> Comments</a>` : ''}
                    </div>
                    <!-- Add Comment -->
                    <div class="add-comment">
                        <img class="profile-pic" src="${Model.currentUserImage}" alt="">
                        <input id="postId${post.id}" type="text" placeholder="Add a comment">
                        <i class="fa-solid fa-hand-pointer add-comment-icon" onclick="addNewComment(${post.id})""></i>
                    </div>
                </div>
            </div>`;

        post_container.insertAdjacentHTML('beforeend', postHtml);
    });
}





function loadMore() {
    const lastPost = document.querySelector('.post:last-of-type');
    if (lastPost) {
        const theLastPost = lastPost.getBoundingClientRect().bottom - window.innerHeight;
        const threshold = 300;
        if (theLastPost < threshold) {
            pageIndex++;
            fetchPosts(pageIndex);
        }
    }
}

window.addEventListener('scroll', loadMore);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// Following  /////////////////


function clickOnFollow(followingId) {
    const follow____btn = document.querySelector(".btn-follow-following");
    fetch('/Follow/FollowUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(followingId)
    })
        .then(response => {
            if (response.ok) {
                follow____btn.innerHTML = " ";
                follow____btn.innerHTML = `
                <i class="fa-solid fa-check"></i> Following
                `
                    
            } else {
                console.log("Error")
            }
        })
        .catch(error => {
            console.log("Error")
        });
}
function clickOnUnFollow(followingId) {
    const follow____btn = document.querySelector(".btn-follow-following");
    fetch('/Follow/UnFollowUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(followingId)
    })
        .then(response => {
            if (response.ok) {
                follow____btn.innerHTML = " ";
                follow____btn.innerHTML = `
                 <i class="fa-solid fa-user-plus"></i> Follow
                `
            } else {
                console.log("Error")
            }
        })
        .catch(error => {
            console.log("Error")
        });
}
