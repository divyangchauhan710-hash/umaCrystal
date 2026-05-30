param (
    [string]$PngPath,
    [string]$JpgPath
)

try {
    [Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null
    $src = [System.Drawing.Image]::FromFile($PngPath)
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatID -eq [System.Drawing.Imaging.ImageFormat]::Jpeg.Guid }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 65)
    $src.Save($JpgPath, $encoder, $encoderParams)
    $src.Dispose()
    Write-Output "Successfully converted and compressed to $JpgPath"
} catch {
    Write-Error "Failed to convert image: $_"
}
