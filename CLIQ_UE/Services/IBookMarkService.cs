﻿using CLIQ_UE.Models;
using CLIQ_UE.ViewModels;
using System.Security.Claims;

namespace CLIQ_UE.Services
{
    public interface IBookMarkService
    {
      void AddBookMark(BookMark BookMarkVM);
        List<BookMark> GetAllBookMark(String UserID);
      
       

    }
}