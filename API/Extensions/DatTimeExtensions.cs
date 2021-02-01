using System;

namespace API.Extensions
{
    public static class DatTimeExtensions
    {
        public static int CalculateAge(this DateTime dob){
           // Save today's date.
            var today = DateTime.Today;

            // Calculate the age.
            var age = today.Year - dob.Year;

            // Go back to the year in which the person was born in case of a leap year
            if (dob.Date > today.AddYears(-age)) age--;

            return age;
        }
    }
}