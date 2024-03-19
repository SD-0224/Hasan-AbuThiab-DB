async function deleteFile(id) {
    try {
      const response = await fetch(`/users/delete/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(
          `File not found. It may have been deleted by another user.`
        );
      }
  
      location.reload();
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  }
  async function deletePost(id) {
    try {
      const response = await fetch(`/posts/delete/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error(
          `File not found. It may have been deleted by another user.`
        );
      }
  
      location.reload();
    } catch (error) {
      console.error("Error deleting file:", error.message);
    }
  }