# Udagram Image Filtering Microservice

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

## Getting Started

To finish the tasks I change the folder structure of the folders according to what I learned in class. 

### Folder Structure 
    .
    ├── deployment_screenshots  # All screnshots of the work done.
    │   └── ...  
    ├── src                     # Source files 
    │   ├── config
    │   │   └── config.ts
    │   ├── controllers
    │   │   └── v0
    │   │   │   ├── image-filter
    │   │   │   │   ├── routes
    │   │   │   │   │   ├── util
    │   │   │   │   │   │   └── ...
    │   │   │   │   │   └── image-filter.router.ts
    │   │   │   ├── index.router.ts
    │   │   │   └── model.router.ts
    │   ├── routes
    │   ├── server.ts 
    │   └── ...    
    ├── cloud-cdnd-c2-final-ricardo-ardiles.postman_collection.json  
    ├── package.json                 
    ├── tsconfig.json
    ├── README.md
    └── ...

### Setup Node Environments

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create a new endpoint to download an image from public URL and return image filtered.

The new endpoint is in `./image-filter/routes/image-filter.router` which uses query parameter to download an image from a public URL, filter the image, and return the result.

```typescript
    router.get('/filteredimage/', async (req: Request, res: Response) => {
        let {image_url } = req.query;

        if (!image_url) {
        return res.status(400).send('image_url is required');
        }
        const new_image = await filterImageFromURL(<string>image_url);

        // set timeout in 3 second by 
        res.setTimeout(3000, function(){
        console.log('Request has timed out. The image is probably too heavy.');
        return res.status(408).send('Request has timed out. The image is probably too heavy or removed.');

        });

        // after finish the response, the image is deleted.
        res.on('finish', function() {
        try{
            const pathTemp =  __dirname + '/util/tmp';
            const filesToDelete = [];
            const files = fs.readdirSync(pathTemp);
            for (const file of files) {
            filesToDelete.push(pathTemp + '/' + file)
            }
            deleteLocalFiles(filesToDelete);
        }
        catch(error){
            console.log(error);
            return res.status(422).send('error when we try to delete temp file.');
        }
        
        });

        return res.sendFile(new_image);
    });
```

### Deploying the system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.


### Custom Domain

http://ricardo-ardiles-image-filter-dev.us-east-2.elasticbeanstalk.com/


### Postman

In this repository you can find a postman collection with two endpoints:

* Local filteredImage
* Elastickbeanstalk filteredImage

The url is fixed to the postman just for testing purpose.

### Elastick

Add your own domain name and have it point to the running services (try adding a subdomain name to point to the processing server)
> !NOTE: Domain names are not included in AWS’ free tier and will incur a cost.
