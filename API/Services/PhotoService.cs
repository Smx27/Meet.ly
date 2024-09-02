using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;
    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var acc = new Account(config.Value.CloudName,config.Value.ApiKey,config.Value.ApiSecret);

        _cloudinary = new Cloudinary(acc);
    }
    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
    {
        if (!Utility.IsImageExtension(file))
        {
            throw new InvalidOperationException("The file is not an image.");
        }
        var uploadResult = new ImageUploadResult();
        if (file.Length <= 0) return uploadResult;
        
        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams{
            File = new FileDescription(file.FileName,stream),
            Transformation = new Transformation().Height(1000).Width(1000).Crop("fill").Gravity("face"),
            Folder = "meet.ly",
        };
        uploadResult = await _cloudinary.UploadAsync(uploadParams);
        return uploadResult;
    }
    public  bool AddPhotoLocal(IFormFile file)
    {
        if (!Utility.IsImageExtension(file))
        {
            throw new InvalidOperationException("The file is not an image.");
        }

        var path = Path.Combine("Upload/Image", file.FileName);

        using Stream image = new FileStream(path, FileMode.Create);
        file.CopyToAsync(image);

        return true ;
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var param = new DeletionParams(publicId);

        return await  _cloudinary.DestroyAsync(param);
    }
}