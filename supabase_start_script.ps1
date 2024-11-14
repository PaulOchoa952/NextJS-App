

# Check if Docker Desktop is running
try {
    docker info > $null 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Output "Docker Desktop is running."
        # Navigate to the project directory
        cd "C:\Users\p_a_u\desktop\supabase"
        # Stop the Supabase instance
        npx supabase stop

        # Start the SupSabase instance
        npx supabase start

        # Navigate to the Next.js project directory
        cd "C:\Users\p_a_u\Desktop\Next-Crud\my-next-app"
    } else {
        Write-Output "Docker Desktop is not running."
    }
} catch {
    Write-Output "Docker Desktop is not running."
}