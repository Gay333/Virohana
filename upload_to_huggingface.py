from huggingface_hub import HfApi, HfFolder

# Replace these with your own values
model_path = "SkinDiseasev2.h5"
repo_name = "GayathriV333/Virohana"

# Authenticate with Hugging Face
api = HfApi()
token = HfFolder.get_token()

# Create a new repository (if it doesn't exist)
#api.create_repo(repo_name, token=token, exist_ok=True)

# Upload the model to the repository
api.upload_file(
    path_or_fileobj=model_path,
    path_in_repo=model_path,
    repo_id=repo_name,
    repo_type="model",
    token=token
)
