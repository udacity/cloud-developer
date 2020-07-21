# Kubermatic KubeOne

`kubeone` is a CLI tool and a Go library for installing, managing, and upgrading
Kubernetes clusters. It can be used on on all your cloud, on-prem, edge, and IoT environments.  

KubeOne can install high-available (HA) master cluster as well single master cluster.

## Documentation / User Guides

All user documentation is available at the [KubeOne docs website](https://docs.kubermatic.com/kubeone/master/).

## Getting Started

A cluster is created using the `kubeone install` command. It takes a KubeOne configuration file and the Terraform state used to source information about the infrastructure.

```bash
kubeone install config.yaml --tfjson ../terraform_aws/tf.json
```

The following document shows in details
[how to get started with KubeOne on AWS][11].

[1]: https://github.com/kubermatic/KubeOne/issues
[2]: https://github.com/kubermatic/KubeOne/blob/master/CONTRIBUTING.md
[3]: https://github.com/kubermatic/KubeOne/releases
[4]: https://github.com/kubermatic/KubeOne/blob/master/CODE_OF_CONDUCT.md
[5]: https://kubernetes.slack.com/messages/CNEV2UMT7
[6]: ./docs/backwards_compatibility_policy.md
[7]: https://github.com/kubernetes-sigs/cluster-api
[8]: https://github.com/kubermatic/machine-controller
[9]: https://github.com/kubermatic/kubeone/releases
[10]: ./docs
[12]: https://github.com/kubermatic/kubeone/tree/master/examples/ansible
[11]: https://docs.kubermatic.com/kubeone/master/getting_started/aws/
[13]: https://github.com/kubermatic/kubeone#features
[14]: https://groups.google.com/forum/#!forum/loodse-dev
[15]: http://slack.k8s.io/
[16]: https://github.com/kubermatic/kubeone/blob/master/CONTRIBUTING.md#reporting-a-security-vulnerability
[17]: https://github.com/kubermatic/kubeone/issues/471
