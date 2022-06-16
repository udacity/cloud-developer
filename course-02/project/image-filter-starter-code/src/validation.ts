
export const validation = (image_url:any) => {
    if(!image_url){
        return { message : 'image_url is required'}
    }

    if(!image_url.startsWith('http') || !image_url.startsWith('https')){
        return { message: 'image_url must start with https/ http' }
    }
}