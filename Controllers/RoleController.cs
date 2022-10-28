using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class RoleController : Controller
    {
        MyContext myContext;

        public RoleController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index()
        {
            var data = myContext.Roles.ToList();
            return View(data);
        }
        public IActionResult Details(int id)
        {
            var data = myContext.Roles.Find(id);
            return View(data);
        }
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Role role)
        {
            myContext.Roles.Add(role);
            var result = myContext.SaveChanges(); //execute nonquery ngereturn int
            if (result > 0)
                return RedirectToAction("Index", "Role");
            return View();
        }

        public IActionResult Edit(int id)
        {
            var data = myContext.Roles.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Role role)
        {
            var data = myContext.Roles.Find(id);
            if (data != null)
            {
                data.Name = role.Name;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "Role");
            }
            return View();
        }

        public IActionResult Delete(int id)
        {
            var data = myContext.Roles.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Role role)
        {
            var data = myContext.Roles.Remove(role);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Role");
            return View();
        }
    }
}