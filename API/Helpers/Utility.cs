namespace API.Helpers
{
    public static class Utility
    {
        public static bool IsImageExtension(IFormFile file)
        {
            string[] imageExtensions = { ".jpg", ".jpeg", ".png", ".gif" };
            string extension = Path.GetExtension(file.FileName);
            return imageExtensions.Contains(extension);
        }

    }
}