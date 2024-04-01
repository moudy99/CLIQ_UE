﻿using CLIQ_UE.Models;
using CLIQ_UE.Services;
using Microsoft.AspNetCore.Mvc;

namespace CLIQ_UE.Controllers
{
    public class test : Controller
    {
        private readonly IPostService postService;

        public test(IPostService postService)
        {
            this.postService = postService;
        }


        public IActionResult t()
        {
            List<Post> posts = postService.GetLatestPosts();

            return Json(posts);
        }

    }
}
