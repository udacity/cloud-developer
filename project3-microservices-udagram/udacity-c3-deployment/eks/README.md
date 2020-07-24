# Elastic Kubernetes Service (Amazon EKS) - Creation guide

Create your cluster with `eksctl` by running the running the following script or the [official guide](https://eksctl.io/usage/creating-and-managing-clusters/).

```bash
eksctl create cluster -f eksclusterconfig.yaml
```

`eksclusterconfig.yaml` follows the [schema described here](https://eksctl.io/usage/schema/)

You get this output:
![eksclustercreation](../../screenshots/eksclustercreation.png)

Your cluster is created and visible in the [AWS Console/EKS](https://eu-west-3.console.aws.amazon.com/eks/home#/clusters):
![eksclusterconsole](../../screenshots/eksclusterconsole.png)
