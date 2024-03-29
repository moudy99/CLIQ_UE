﻿using System.ComponentModel.DataAnnotations;

namespace CLIQ_UE.Models
{
    public class Post
    {

        public int Id { get; set; }


        // Mandatory ,, make null just for test --> 
        [Required(ErrorMessage = "Post text is required")]
        [MaxLength(500, ErrorMessage = "Post text cannot exceed 500 characters")]
        public string? TextContent { get; set; }


        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime PostDate { get; set; }
        public List<string>? PostImages { get; set; }
        public List<string>? Videos { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public int RepostCount { get; set; }
        public int CommentCount { get; set; }
        public string privacy { get; set; }
        // Navigation properties
        public ICollection<View> Views { get; set; }
        public ICollection<Reaction> Reactions { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }

    public enum ReactionType
    {
        Like,
        Dislike,
        Love,
        Repost,

    }
}
