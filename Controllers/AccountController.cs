using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Context;
using WebApp.Handlers;
using WebApp.Models;
using WebApp.ViewModel;

namespace WebApp.Controllers
{
    public class AccountController : Controller
    {
        MyContext myContext;

        public AccountController(MyContext myContext)
        {
            this.myContext = myContext;
        }

        //Login
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(string email, string password)
        {
            //var data = myContext.Users
            //    .Include(x => x.Employee)
            //    .Include(x => x.Role)
            //    .SingleOrDefault(x => x.Employee.Email.Equals(email));
            //var validatePass = Hashing.ValidatePassword(password, data.Password);
            
            //if (data != null && validatePass)
            //{
            //    //ResponseLogin responseLogin = new ResponseLogin()
            //    //{
            //    //    Id = data.Id,
            //    //    FullName = data.Employee.FullName,
            //    //    Email = data.Employee.Email,
            //    //    Role = data.Role.Name
            //    //};

            //    HttpContext.Session.SetInt32("Id", data.Id);
            //    HttpContext.Session.SetString("FullName", data.Employee.FullName);
            //    HttpContext.Session.SetString("Email", data.Employee.Email);
            //    HttpContext.Session.SetString("Role", data.Role.Name);

            //    return RedirectToAction("Index", "Department"/* responseLogin*/);
            //}
            return View();
        }

        //Register
        public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Register(string fullName, string email, DateTime birthDate, string password)
        {
            //Employee employee = new Employee()
            //{
            //    FullName = fullName,
            //    Email = email,
            //    BirthDate = birthDate
            //};
            //myContext.Employees.Add(employee);
            //var data = myContext.Employees.SingleOrDefault(x => x.Email.Equals(email));
            //if (data == null)
            //{
            //    var result = myContext.SaveChanges();
            //    if (result > 0)
            //    {
            //        var id = myContext.Employees.SingleOrDefault(x => x.Email.Equals(email)).Id;
            //        User user = new User()
            //        {
            //            Id = id,
            //            Password = Hashing.HashPassword(password),
            //            RoleId = 1
            //        };
            //        myContext.Users.Add(user);
            //        var resultUser = myContext.SaveChanges();
            //        if (resultUser > 0)
            //            return RedirectToAction("Login", "Account");
            //    }
            //}
            return View();
        }

        //Change Password
        public IActionResult ChangePassword()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ChangePassword(string email, string passwordLama, string passwordBaru)
        {
            //var data = myContext.Users.Include(x => x.Employee)
            //    .SingleOrDefault(x => x.Employee.Email.Equals(email));
            //var validatePass = Hashing.HashPassword(passwordLama);
            //if (data != null)
            //{
            //    data.Password = Hashing.HashPassword(passwordBaru);
            //    myContext.Entry(data).State = EntityState.Modified;
            //    var resultUser = myContext.SaveChanges();
            //    if(resultUser > 0)
            //    {
            //        return RedirectToAction("Login", "Account");
            //    }
            //}
            return View();
        }

        //Forgot Password
        public IActionResult ForgotPassword()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ForgotPassword(string email, string passwordBaru)
        {
            //var data = myContext.Users.Include(x => x.Employee)
            //    .SingleOrDefault(x => x.Employee.Email.Equals(email));
            //if(data != null)
            //{
            //    data.Password = Hashing.HashPassword(passwordBaru);
            //    myContext.Entry(data).State = EntityState.Modified;
            //    var resultUser = myContext.SaveChanges();
            //    if (resultUser > 0)
            //    {
            //        return RedirectToAction("Login", "Account");
            //    }
            //}
            return View();
        }
    }
}
