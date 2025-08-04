import apiClient from ".";


const GetReq =async(path)=>{
    try{
        const response = await apiClient.get(path)
        return response
    }
    catch(error){
        console.log(error)
    }
}


const PostReq = async(path,data,form) => {
    try{
        const response = await apiClient.post(path,data,form)
        return response


    }
    catch(error){
        console.log(`Error fetching data : ${error.message}`)
        if (error.message === 'timeout of 9000ms exceeded'){
            console.log('no internet')
        }
    }
}



const DeleteReq = async(path,data) => {
    try{
        const response = await apiClient.delete(path,data)
        return response

    }
    catch(error){
        console.log(error)
    }
}


const PutReq = async(path,data,form) => {
    try{
        const response = await apiClient.put(path,data,form)
        return response

    }
    catch(error){
        console.log(error)
    }
}

export {GetReq,PostReq,DeleteReq,PutReq}