﻿namespace CLIQ_UE.ViewModels
{
	public class ProfileViewVM
	{
		public string UserId { get; set; }
		public string UserName { get; set; }
		public string UserImage { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string CoverImage { get; set; }

		public int PostCount { get; set; }
		public int FollowingCount { get; set; }
		public int FollowersCount { get; set; }
		public string Location { get; set; }

		public bool IsFollowing { get; set; }
		public bool isFollowingMe { get; set; }

		public int newNotificationCount { get; set; }

		public string currentUserId { get; set; }
		public string CurrentUserImage { get; set; }
		public string CurrentUserName { get; set; }

		public string Bio { get; set; }
		public bool IsMutualFollowing { get; set; }
		public bool IsVerified { get; set; }
	}
}
