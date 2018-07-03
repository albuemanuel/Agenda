﻿using System;
using System.IO;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Agenda
{
    public class HomeController : Controller
    {
        IRepository repository;

        public static IConfiguration Configuration { get; set; }
        public HomeController()
        {
            var builder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json");

            Configuration = builder.Build();

            var type = $"{Configuration["repository"]}";

            repository = type == "db" ? (IRepository)new DataBaseRepository() : new FileRepository();
            
        }

        public IActionResult Index()
        {
            return View(repository.Load());
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Note note)
        {
            repository.Create(note);
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        public IActionResult Edit(Note note)
        {
            repository.Edit(note);
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            return View(repository.GetNote(id));
        }

        [HttpPost]
        public IActionResult Delete(Note note)
        {
            repository.Delete(note);
            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            return View();
        }
    }
}