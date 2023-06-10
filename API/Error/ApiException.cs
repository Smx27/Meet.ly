using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Error
{
    public class ApiException
    {
        /* This is a class called `ApiException` that has three properties: `StatusCode`, `Message`,
        and `Details`. It also has a constructor that takes in three parameters: `statusCode`,
        `message`, and `details`. The constructor sets the values of the properties to the values of
        the corresponding parameters. This class is likely used to handle exceptions that occur in
        an API and return an error response with the appropriate status code, message, and details. */
        public ApiException(int statusCode, string message, string details)
        {
            StatusCode = statusCode;
            Message = message;
            Details = details;
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}