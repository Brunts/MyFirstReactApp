using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/users")]
[ApiController]
public class UsersController : ControllerBase
{
    private static List<User> users = new()
    {
        new User { Id = 1, Name = "John Doe", Email = "john@example.com" },
        new User { Id = 2, Name = "Jane Doe", Email = "jane@example.com" }
    };

    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(users);
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
