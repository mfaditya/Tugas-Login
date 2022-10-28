using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Models;

namespace WebApp.Controllers
{
    public class EmployeeController : Controller
    {
        MyContext myContext;

        public EmployeeController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        public IActionResult Index()
        {
            var data = myContext.Employees.ToList();
            return View(data);
        }
        public IActionResult Details(int id)
        {
            var data = myContext.Employees.Find(id);
            return View(data);
        }
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Employee employee)
        {
            myContext.Employees.Add(employee);
            var result = myContext.SaveChanges(); //execute nonquery ngereturn int
            if (result > 0)
                return RedirectToAction("Index", "Employee");
            return View();
        }

        public IActionResult Edit(int id)
        {
            var data = myContext.Employees.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Employee employee)
        {
            var data = myContext.Employees.Find(id);
            if (data != null)
            {
                data.FullName = employee.FullName;
                data.Email = employee.Email;
                data.BirthDate = employee.BirthDate;
                myContext.Entry(data).State = EntityState.Modified;
                var result = myContext.SaveChanges();
                if (result > 0)
                    return RedirectToAction("Index", "Employee");
            }
            return View();
        }

        public IActionResult Delete(int id)
        {
            var data = myContext.Employees.Find(id);
            return View(data);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Employee employee)
        {
            var data = myContext.Employees.Remove(employee);
            var result = myContext.SaveChanges();
            if (result > 0)
                return RedirectToAction("Index", "Employee");
            return View();
        }
    }
}
