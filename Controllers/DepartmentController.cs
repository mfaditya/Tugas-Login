using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class DepartmentController :Controller
    {
        MyContext myContext;

        public DepartmentController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index()
        {
            var data = myContext.Departments.ToList();
            return View(data);
        }
        public IActionResult Details(int id)
        {
            var data = myContext.Departments.Find(id);
            return View(data);
        }
        public IActionResult Create()
        {
            var data = new MyViewModel();
            data.Divisions = myContext.Divisions.Select(a => new SelectListItem() 
            {
                Value = a.Id.ToString(),
                Text = a.Name
            }).ToList();
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Department department)
        {
            myContext.Departments.Add(department);
            var result = myContext.SaveChanges(); //execute nonquery ngereturn int
            if (result > 0)
                return RedirectToAction("Index", "Department");
            return View();
        }

        public IActionResult Edit(int id)
        {
            var data = myContext.Departments.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Department department)
        {
            var data = myContext.Departments.Find(id);
            if (data != null)
            {
                data.Name = department.Name;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "Department");
            }
            return View();
        }

        public IActionResult Delete(int id)
        {
            var data = myContext.Departments.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Department department)
        {
            var data = myContext.Departments.Remove(department);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Department");
            return View();
        }
    }
}
