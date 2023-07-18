import styles from "./createBlog.module.css";
import {useState, useRef, useEffect} from 'react';
import {db} from './firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, setDoc} from "firebase/firestore"; 

function CreateBlog() {

    const [formData , setFormData] = useState({title:"", content:""});
    const [blogs , setBlogs] = useState([]);
    
    const titleRef = useRef(null);
    
    useEffect(()=>{
      document.title = 'Blog | React ';
      onSnapshot(collection(db,"blogs"), (snapShot) => {
        const blogs = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            setBlogs(blogs);
    })

    },[]);
    async function handleSubmit(e){
        e.preventDefault();

        const docRef = doc(collection(db, "blogs"))
            
        await setDoc(docRef, {
                title: formData.title,
                content: formData.content,
                createdOn: new Date()
            });

        setFormData({title:"", content:""} );
        titleRef.current.focus();
    }
    
    async function handleDelete(id){
      const docRef = doc(db,"blogs",id);
      await deleteDoc(docRef);
    }
    
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.createBlogContainer}>
          <div className={styles.createBlogTitle}>
            <h1>Add Blog</h1>
          </div>
          <div className={styles.blogForm}>
            <form onSubmit={handleSubmit}>
              <input name="blogTitle" 
                    placeholder="Enter Blog Your Title" 
                    value={formData.title}
                    ref= {titleRef}
                    onChange={(e)=> { setFormData( { title : e.target.value , content: formData.content} )  } }

              />
              <textarea
                name="blogContent"
                placeholder="Enter your Blog content"
                value={formData.content}
                onChange={(e)=> { setFormData( { content : e.target.value , title: formData.title} ) } }
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
        <div className={styles.blogContainer}>
            <div className={styles.blogs}>
                <div className={styles.createBlogTitle}>
                    <h1>Blogs</h1>
                </div>
                <div className={styles.blogsData}>
                    {
                        blogs.map ( (currentBlog , index) =>(
                                <div  key ={index} className={styles.blogItem}>
                                    <h2>{currentBlog.title}</h2>
                                    <h4 className={ styles.blogContent}  >{currentBlog.content}</h4>
                                    <button onClick={ ()=> handleDelete(currentBlog.id) }>Delete</button>
                                </div>
                            ))
                    }
                   
                </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default CreateBlog;
