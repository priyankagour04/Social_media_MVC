import Comment from '../Models/commentModel.js';
import postModel from '../Models/postModel.js';


export const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, text } = req.body;

   
  } catch (error) {
 
  }
};

export const getComments = async (req, res) => {
  try {
    
  } catch (error) {
    
  }
}

export const deleteComment  = async (req, res) => {
    try {
      
  
     
    } catch (error) {
   
    }
  };
  
  export const updateComment   = async (req, res) => {
    try {
      
  
     
    } catch (error) {
   
    }
  };
  
  export const replyOnComment = async (req, res) => {

    try {
        
    } catch (error) {
        
    }
  }
  