using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class UserController : Controller
    {
        MyContext myContext;

        public UserController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index()
        {
            var data = myContext.Users.ToList();
            return View(data);
        }
        public IActionResult Details(int id)
        {
            var data = myContext.Users.Find(id);
            return View(data);
        }
        public IActionResult Create()
        {
            var data = new UserVM();
            data.Employees = myContext.Employees.Select(a => new SelectListItem()
            {
                Value = a.Id.ToString(),
                Text = a.FullName
            }).ToList();
            
            data.Roles = myContext.Roles.Select(a => new SelectListItem()
            {
                Value = a.Id.ToString(),
                Text = a.Name
            }).ToList();

            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(User user)
        {
            myContext.Users.Add(user);
            var result = myContext.SaveChanges(); //execute nonquery ngereturn int
            if (result > 0)
                return RedirectToAction("Index", "User");
            return View();
        }

        public IActionResult Edit(int id)
        {
            var data = new UserVM();
            data.Employees = myContext.Employees.Select(a => new SelectListItem()
            {
                Value = a.Id.ToString(),
                Text = a.FullName
            }).ToList();

            data.Roles = myContext.Roles.Select(a => new SelectListItem()
            {
                Value = a.Id.ToString(),
                Text = a.Name
            }).ToList();
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, User user)
        {
            var data = myContext.Users.Find(id);
            if (data != null)
            {
                data.Password = user.Password;
                data.RoleId = user.RoleId;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "User");
            }
            return View();
        }

        public IActionResult Delete(int id)
        {
            var data = myContext.Users.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(User user)
        {
            var data = myContext.Users.Remove(user);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "User");
            return View();
        }
    }
}