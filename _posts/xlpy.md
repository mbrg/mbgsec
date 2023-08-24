#### Basic recon

````python
import os
os.popen('uname -a').read()
````
````
Linux SandboxHost-638284801076031219 5.10.102.2-microsoft-standard #1 SMP Mon Mar 7 17:36:34 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
````

````python
import os
os.popen('cat /etc/*release').read()
````
````
DISTRIB_ID=""Mariner""
DISTRIB_RELEASE=""2.0.20230811""
DISTRIB_CODENAME=Mariner
DISTRIB_DESCRIPTION=""CBL-Mariner 2.0.20230811""
CBL-Mariner 2.0.20230811
MARINER_BUILD_NUMBER=c5977a5
NAME=""Common Base Linux Mariner""
VERSION=""2.0.20230811""
ID=mariner
VERSION_ID=""2.0""
PRETTY_NAME=""CBL-Mariner/Linux""
ANSI_COLOR=""1;34""
HOME_URL=""https://aka.ms/cbl-mariner""
BUG_REPORT_URL=""https://aka.ms/cbl-mariner""
SUPPORT_URL=""https://aka.ms/cbl-mariner""
````

````python
import os
os.popen('getent passwd').read()
````
````
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/dev/null:/bin/false
daemon:x:6:6:Daemon User:/dev/null:/bin/false
messagebus:x:18:18:D-Bus Message Daemon User:/var/run/dbus:/bin/false
systemd-bus-proxy:x:72:72:systemd Bus Proxy:/:/bin/false
systemd-journal-gateway:x:73:73:systemd Journal Gateway:/:/bin/false
systemd-journal-remote:x:74:74:systemd Journal Remote:/:/bin/false
systemd-journal-upload:x:75:75:systemd Journal Upload:/:/bin/false
systemd-network:x:76:76:systemd Network Management:/:/bin/false
systemd-resolve:x:77:77:systemd Resolver:/:/bin/false
systemd-timesync:x:78:78:systemd Time Synchronization:/:/bin/false
systemd-coredump:x:79:79:systemd Core Dumper:/:/usr/bin/false
systemd-oom:x:80:80:systemd Userspace OOM Killer:/:/usr/bin/false
nobody:x:65534:65533:Unprivileged User:/dev/null:/bin/false
jovyan:x:1000:100::/home/jovyan:/bin/bash
````

````python
import os
os.popen('id').read()
# uid=1000(jovyan) gid=100(users) groups=100(users)

import os
os.popen('groups jovyan').read()
# jovyan : users

import os
os.popen('cat /etc/passwd').read()
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/dev/null:/bin/false
daemon:x:6:6:Daemon User:/dev/null:/bin/false
messagebus:x:18:18:D-Bus Message Daemon User:/var/run/dbus:/bin/false
systemd-bus-proxy:x:72:72:systemd Bus Proxy:/:/bin/false
systemd-journal-gateway:x:73:73:systemd Journal Gateway:/:/bin/false
systemd-journal-remote:x:74:74:systemd Journal Remote:/:/bin/false
systemd-journal-upload:x:75:75:systemd Journal Upload:/:/bin/false
systemd-network:x:76:76:systemd Network Management:/:/bin/false
systemd-resolve:x:77:77:systemd Resolver:/:/bin/false
systemd-timesync:x:78:78:systemd Time Synchronization:/:/bin/false
systemd-coredump:x:79:79:systemd Core Dumper:/:/usr/bin/false
systemd-oom:x:80:80:systemd Userspace OOM Killer:/:/usr/bin/false
nobody:x:65534:65533:Unprivileged User:/dev/null:/bin/false
jovyan:x:1000:100::/home/jovyan:/bin/bash

import os
os.popen('echo "root2:rOr30SXusA:0:0:root:/root:/bin/bash" | tee -a /etc/passwd').read()
# Permission denied
````

Magic functions
```
from IPython.core.magic import register_line_magic

@register_line_magic
def lsmagic_to_var(line):
    var_name = line.strip()
    magic_output = %lsmagic
    get_ipython().user_ns[var_name] = magic_output

%lsmagic_to_var my_var
print(my_var)


Available line magics:
%alias  %alias_magic  %autoawait  %autocall  %automagic  %autosave  %bookmark  %cat  %cd  %clear  %colors  %conda  %config  %connect_info  %cp  %debug  %dhist  %dirs  %doctest_mode  %ed  %edit  %env  %gui  %hist  %history  %killbgscripts  %ldir  %less  %lf  %lk  %ll  %load  %load_ext  %loadpy  %logoff  %logon  %logstart  %logstate  %logstop  %ls  %lsmagic  %lsmagic_to_var  %lx  %macro  %magic  %man  %matplotlib  %mkdir  %more  %mv  %notebook  %page  %pastebin  %pdb  %pdef  %pdoc  %pfile  %pinfo  %pinfo2  %pip  %popd  %pprint  %precision  %prun  %psearch  %psource  %pushd  %pwd  %pycat  %pylab  %qtconsole  %quickref  %recall  %rehashx  %reload_ext  %rep  %rerun  %reset  %reset_selective  %rm  %rmdir  %run  %save  %sc  %set_env  %store  %sx  %system  %tb  %time  %timeit  %unalias  %unload_ext  %who  %who_ls  %whos  %xdel  %xmode

Available cell magics:
%%!  %%HTML  %%SVG  %%bash  %%capture  %%debug  %%file  %%html  %%javascript  %%js  %%latex  %%markdown  %%perl  %%prun  %%pypy  %%python  %%python2  %%python3  %%ruby  %%script  %%sh  %%svg  %%sx  %%system  %%time  %%timeit  %%writefile

Automagic is ON, % prefix IS NOT needed for line magics.
```

#### Open ports

```python
import socket
import psutil

open_ports = []

for port in range(1, 65536):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(1)
    result = sock.connect_ex(('localhost', port))
    if result == 0:
        open_ports.append(port)
    sock.close()

for port in open_ports:
    for conn in psutil.net_connections(kind='inet'):
        if conn.laddr.port == port:
            pid = conn.pid
            p = psutil.Process(pid)
            cmdline = " ".join(p.cmdline())
            print(f"Port {port} is open and being used by {p.name()} (PID: {pid}), Command: {cmdline}")
```
```
Port 2759 is open and being used by python (PID: None), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 5002 is open and being used by dotnet (PID: 65), Command: dotnet /app/service/Microsoft.OfficePy.Service.CodeExecutionService.dll
Port 8888 is open and being used by jupyter-noteboo (PID: 103), Command: /app/officepy/bin/python /app/officepy/bin/jupyter-notebook --ip 0.0.0.0 --no-browser
Port 8888 is open and being used by jupyter-noteboo (PID: 103), Command: /app/officepy/bin/python /app/officepy/bin/jupyter-notebook --ip 0.0.0.0 --no-browser
Port 8888 is open and being used by jupyter-noteboo (PID: 103), Command: /app/officepy/bin/python /app/officepy/bin/jupyter-notebook --ip 0.0.0.0 --no-browser
Port 32907 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 32907 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 32907 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 38415 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 40755 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 40755 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 40755 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 42935 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 44763 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 44763 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 49273 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 49273 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
Port 49273 is open and being used by python (PID: 618), Command: /app/officepy/bin/python -m ipykernel_launcher -f /home/jovyan/.local/share/jupyter/runtime/kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
```

```
```
```
/app
Dockerfile
Microsoft.OfficePy.CodeExecutionJupyter.nuspec
[Content_Types].xml
_rels
codeexecjupyter.yml
condaentrypoint.sh
entrypoint.sh
excel.tar.gz
excel.whl
httpproxy
httpproxy.zip
officepy
officepydep.tar.gz
officepydep.whl
package
pytestresultpkg.tar.gz
pytestresultpkg.whl
service
service.zip

/app/officepy
bin
compiler_compat
conda-meta
doc
etc
include
lib
libexec
man
mkspecs
phrasebooks
plugins
pyodbc.pyi
qml
resources
sbin
share
ssl
translations
var
x86_64-conda-linux-gnu
x86_64-conda_cos7-linux-gnu


/app/service
Azure.Core.dll
Azure.Identity.dll
Azure.Security.KeyVault.Certificates.dll
Azure.Security.KeyVault.Keys.dll
Azure.Security.KeyVault.Secrets.dll
Dockerfile
IfxMetricExtensionsManaged.dll
Microsoft.AspNetCore.Authentication.JwtBearer.dll
Microsoft.AspNetCore.Authentication.OpenIdConnect.dll
Microsoft.AspNetCore.Cryptography.Internal.dll
Microsoft.AspNetCore.DataProtection.Abstractions.dll
Microsoft.AspNetCore.DataProtection.dll
Microsoft.Bcl.AsyncInterfaces.dll
Microsoft.Extensions.Logging.Abstractions.dll
Microsoft.Extensions.Options.dll
Microsoft.IO.RecyclableMemoryStream.dll
Microsoft.Identity.Abstractions.dll
Microsoft.Identity.Client.Extensions.Msal.dll
Microsoft.Identity.Client.dll
Microsoft.Identity.Web.Certificate.dll
Microsoft.Identity.Web.Certificateless.dll
Microsoft.Identity.Web.Diagnostics.dll
Microsoft.Identity.Web.TokenAcquisition.dll
Microsoft.Identity.Web.TokenCache.dll
Microsoft.Identity.Web.dll
Microsoft.IdentityModel.Abstractions.dll
Microsoft.IdentityModel.JsonWebTokens.dll
Microsoft.IdentityModel.Logging.dll
Microsoft.IdentityModel.LoggingExtensions.dll
Microsoft.IdentityModel.Protocols.OpenIdConnect.dll
Microsoft.IdentityModel.Protocols.dll
Microsoft.IdentityModel.Tokens.dll
Microsoft.IdentityModel.Validators.dll
Microsoft.OfficePy.Core.dll
Microsoft.OfficePy.Core.pdb
Microsoft.OfficePy.DataStore.Abstractions.dll
Microsoft.OfficePy.DataStore.Abstractions.pdb
Microsoft.OfficePy.JupyterServerProtocolClient.dll
Microsoft.OfficePy.JupyterServerProtocolClient.pdb
Microsoft.OfficePy.Service.Abstractions.dll
Microsoft.OfficePy.Service.Abstractions.pdb
Microsoft.OfficePy.Service.CodeExecutionService.deps.json
Microsoft.OfficePy.Service.CodeExecutionService.dll
Microsoft.OfficePy.Service.CodeExecutionService.exe
Microsoft.OfficePy.Service.CodeExecutionService.pdb
Microsoft.OfficePy.Service.CodeExecutionService.runtimeconfig.json
Microsoft.OfficePy.Service.Core.dll
Microsoft.OfficePy.Service.Core.pdb
Microsoft.R9.Extensions.AsyncState.dll
Microsoft.R9.Extensions.Buffers.Abstractions.dll
Microsoft.R9.Extensions.Cryptography.dll
Microsoft.R9.Extensions.Data.Classification.dll
Microsoft.R9.Extensions.Data.Compliance.Abstractions.dll
Microsoft.R9.Extensions.DependencyInjection.AutoActivation.dll
Microsoft.R9.Extensions.Diagnostics.ExceptionSummary.Abstractions.dll
Microsoft.R9.Extensions.Diagnostics.ExceptionSummary.Http.dll
Microsoft.R9.Extensions.Diagnostics.ExceptionSummary.dll
Microsoft.R9.Extensions.Enrichment.Abstractions.dll
Microsoft.R9.Extensions.EnumStrings.dll
Microsoft.R9.Extensions.Logging.Abstractions.dll
Microsoft.R9.Extensions.Logging.Exporters.Console.dll
Microsoft.R9.Extensions.Logging.Exporters.Geneva.dll
Microsoft.R9.Extensions.Logging.dll
Microsoft.R9.Extensions.Metering.Abstractions.dll
Microsoft.R9.Extensions.Metering.Geneva.dll
Microsoft.R9.Extensions.Options.Validation.dll
Microsoft.R9.Extensions.Pools.Abstractions.dll
Microsoft.R9.Extensions.Pools.dll
Microsoft.R9.Extensions.Redaction.Abstractions.dll
Microsoft.R9.Extensions.Redaction.O365Hashing.dll
Microsoft.R9.Extensions.Redaction.dll
Microsoft.R9.Extensions.Telemetry.Abstractions.dll
Microsoft.R9.Extensions.Telemetry.Internal.Http.dll
Microsoft.R9.Extensions.Telemetry.Internal.dll
Microsoft.R9.Extensions.Telemetry.dll
Microsoft.R9.Service.AsyncState.HttpContext.dll
Microsoft.R9.Service.Enrichment.RequestHeaders.dll
Microsoft.R9.Service.Http.dll
Microsoft.R9.Service.Middleware.Http.Logging.dll
Microsoft.R9.Service.Middleware.HttpMetering.dll
Microsoft.Win32.SystemEvents.dll
OpenTelemetry.Api.ProviderBuilderExtensions.dll
OpenTelemetry.Api.dll
OpenTelemetry.Exporter.Geneva.dll
OpenTelemetry.dll
System.Drawing.Common.dll
System.IdentityModel.Tokens.Jwt.dll
System.Memory.Data.dll
System.Security.Cryptography.Pkcs.dll
System.Security.Cryptography.ProtectedData.dll
System.Security.Cryptography.Xml.dll
appsettings.Development.json
appsettings.json
packages.lock.json
runtimes

cat /app/Dockerfile
"# This docker file can be used to build the docker image from the jupyter nuget package
# For building just CodeExecJupyter docker image
# RUN powershell %SRCROOT%\officepy\servicev2\test\tool\build-docker-image-from-nuget.ps1 -Nuget %TARGETROOT%\x64\debug\pkgnuget_officepyservice\x-none\servicev2\Microsoft.OfficePy.CodeExecutionJupyter.nupkg -Target %tmp%\CodeExecJupyterImage -Tag codeexecjupyter -Dockerfile Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:7.0-cbl-mariner2.0

WORKDIR /app
EXPOSE 80

# Same user with jupyter image.
ARG NB_GID=""100""
ARG NB_UID=""1000""
ARG NB_USER=""jovyan""

COPY ./ /app
RUN chmod +x /app/entrypoint.sh
RUN sed -i -e 's/\r$//' /app/entrypoint.sh
RUN chmod +x /app/condaentrypoint.sh
RUN sed -i -e 's/\r$//' /app/condaentrypoint.sh

# Install conda
RUN tdnf install -y \
    conda  \
    unzip \
    shadow-utils && \
    tdnf upgrade -y && \
    tdnf clean all

# Create the app/officepy folder
RUN mkdir /app/officepy

# Create the app/service folder
RUN mkdir /app/service
RUN mkdir /app/httpproxy

# unzip service.zip to service folder
RUN unzip service.zip -d /app/service

# unzip httpproxy.zip to httpproxy folder
RUN unzip httpproxy.zip -d /app/httpproxy

# Create conda environment
RUN conda env create --prefix /app/officepy --file /app/codeexecjupyter.yml --force

# Make RUN commands use the officepy conda environment:
SHELL [""conda"", ""run"", ""-p"", ""/app/officepy"", ""/bin/bash"", ""-c""]

# pytest-json-report is not available in conda channels, so we have to get it from pip.
RUN pip install pytest-json-report
RUN pip install /app/excel.tar.gz /app/pytestresultpkg.tar.gz /app/officepydep.tar.gz

# Add group, user and provide user ownership
RUN useradd -u ${NB_UID} -g ${NB_GID} ${NB_USER} \
&& chown -R ${NB_USER} /app/officepy \
&& chown -R ${NB_USER} /app/service \
&& chown -R ${NB_USER} /app/httpproxy \
&& chown -R ${NB_USER} /home
USER ${NB_UID}

ENTRYPOINT [""/app/entrypoint.sh""]
```

#### Jupyter Runtime
```
import os
import os
os.popen('cat /home/jovyan/.local/share/jupyter/runtime/nbserver-103.json').read()

kernel-987b5225-ae54-468f-b900-bfe9db1f31a4.json
nbserver-103-open.html
nbserver-103.json
notebook_cookie_secret

"{
  ""base_url"": ""/"",
  ""hostname"": ""0.0.0.0"",
  ""notebook_dir"": ""/app"",
  ""password"": false,
  ""pid"": 103,
  ""port"": 8888,
  ""secure"": false,
  ""sock"": """",
  ""token"": ""e9a7adec-75a7-4da2-a943-ffe0335b0d5d"",
  ""url"": ""http://0.0.0.0:8888/""
}"
```


#### Env vars

```python
import os
for osk, osv in os.environ.items():
    print(f"Env var: {osk}={osv}")
```

```
Env var: Fabric_NET-0-[Delegated]=10.32.0.10
Env var: OfficePy__DataUploadPath=/mnt/data_upload
Env var: IDENTITY_API_VERSION=2020-05-01
Env var: CONDA_EXE=/usr/bin/conda
Env var: _CE_M=
Env var: HOSTNAME=SandboxHost-638284548972899737
Env var: IDENTITY_SERVER_THUMBPRINT=a35db73c89c41e7023ca9208cd2cd2a90d01f306
Env var: OFFICEPY_DATA_UPLOAD_PATH=/mnt/data_upload
Env var: DOTNET_VERSION=7.0.10
Env var: Logging__LogLevel__Default=Information
Env var: OfficePy__ComputeResourceId=66f6c615-4d02-4cbf-bb6d-767f8740bb7d
Env var: ASPNETCORE_URLS=http://+:80
Env var: PWD=/app
Env var: OfficePy__Jupyter__Url=http://localhost:8888
Env var: CONDA_ROOT=/usr/share/conda
Env var: Fabric_NetworkingMode=Other;Delegated
Env var: JUPYTER_TOKEN=1dd43ddb-9f2a-4475-8424-dc3e63291d56
Env var: CONDA_PREFIX=/app/officepy
Env var: _=/app/officepy/bin/jupyter
Env var: Fabric_Id=a492f450-c11b-4d9d-8e9d-6e25f718f0f9
Env var: Fabric_ApplicationName=caas-066ceaa3936144679f39ae063b23467a
Env var: HOME=/home/jovyan
Env var: Fabric_CodePackageName=codeexecsvc
Env var: CONDA_PROMPT_MODIFIER=(/app/officepy) 
Env var: Kestrel__Endpoints__HttpsInlineCertFile__Url=https://*:5002
Env var: Fabric_NodeIPOrFQDN=10.92.0.14
Env var: IDENTITY_HEADER=eyAidHlwIiA6I...
Env var: OfficePy__ComputeResourceKey=mgpFURIiW9L...
Env var: TERM=xterm-color
Env var: _CE_CONDA=
Env var: NO_PROXY=localhost,127.0.0.1
Env var: CONDA_SHLVL=2
Env var: Fabric_ServiceDnsName=service.caas-066ceaa3936144679f39ae063b23467a
Env var: OfficePy__Jupyter__Token=1dd43ddb...
Env var: SHLVL=2
Env var: ASPNET_VERSION=7.0.10
Env var: HTTPS_PROXY=http://localhost:8000
Env var: HTTP_PROXY=http://localhost:8000
Env var: DOTNET_RUNNING_IN_CONTAINER=true
Env var: CONDA_PYTHON_EXE=/usr/bin/python3
Env var: Fabric_ServiceName=service
Env var: CONDA_DEFAULT_ENV=/app/officepy
Env var: Kestrel__Endpoints__HttpsInlineCertFile__Certificate__Path=/mnt/secrets/sslcert
Env var: PATH=/app/officepy/bin:/usr/condabin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
Env var: CONDA_PREFIX_1=/usr
Env var: OFFICEPY_DEPLOYMENT_INSTANCE=prodp6-northeurope-66f6c615-4d02-4cbf-bb6d-767f8740bb7d
Env var: PYDEVD_USE_FRAME_EVAL=NO
Env var: JPY_PARENT_PID=102
Env var: CLICOLOR=1
Env var: FORCE_COLOR=1
Env var: CLICOLOR_FORCE=1
Env var: PAGER=cat
Env var: GIT_PAGER=cat
Env var: MPLBACKEND=module://matplotlib_inline.backend_inline
```

#### Stack
```python
import traceback
for line in traceback.format_stack():
    print(line.strip())
```

```
File "/app/officepy/lib/python3.9/runpy.py", line 197, in _run_module_as_main
    return _run_code(code, main_globals, None,
File "/app/officepy/lib/python3.9/runpy.py", line 87, in _run_code
    exec(code, run_globals)
File "/app/officepy/lib/python3.9/site-packages/ipykernel_launcher.py", line 17, in <module>
    app.launch_new_instance()
File "/app/officepy/lib/python3.9/site-packages/traitlets/config/application.py", line 992, in launch_instance
    app.start()
File "/app/officepy/lib/python3.9/site-packages/ipykernel/kernelapp.py", line 711, in start
    self.io_loop.start()
File "/app/officepy/lib/python3.9/site-packages/tornado/platform/asyncio.py", line 199, in start
    self.asyncio_loop.run_forever()
File "/app/officepy/lib/python3.9/asyncio/base_events.py", line 601, in run_forever
    self._run_once()
File "/app/officepy/lib/python3.9/asyncio/base_events.py", line 1905, in _run_once
    handle._run()
File "/app/officepy/lib/python3.9/asyncio/events.py", line 80, in _run
    self._context.run(self._callback, *self._args)
File "/app/officepy/lib/python3.9/site-packages/ipykernel/kernelbase.py", line 510, in dispatch_queue
    await self.process_one()
File "/app/officepy/lib/python3.9/site-packages/ipykernel/kernelbase.py", line 499, in process_one
    await dispatch(*args)
File "/app/officepy/lib/python3.9/site-packages/ipykernel/kernelbase.py", line 406, in dispatch_shell
    await result
File "/app/officepy/lib/python3.9/site-packages/ipykernel/kernelbase.py", line 729, in execute_request
    reply_content = await reply_content
File "/app/officepy/lib/python3.9/site-packages/ipykernel/ipkernel.py", line 411, in do_execute
    res = shell.run_cell(
File "/app/officepy/lib/python3.9/site-packages/ipykernel/zmqshell.py", line 531, in run_cell
    return super().run_cell(*args, **kwargs)
File "/app/officepy/lib/python3.9/site-packages/IPython/core/interactiveshell.py", line 2961, in run_cell
    result = self._run_cell(
File "/app/officepy/lib/python3.9/site-packages/IPython/core/interactiveshell.py", line 3016, in _run_cell
    result = runner(coro)
File "/app/officepy/lib/python3.9/site-packages/IPython/core/async_helpers.py", line 129, in _pseudo_sync_runner
    coro.send(None)
File "/app/officepy/lib/python3.9/site-packages/IPython/core/interactiveshell.py", line 3221, in run_cell_async
    has_raised = await self.run_ast_nodes(code_ast.body, cell_name,
File "/app/officepy/lib/python3.9/site-packages/IPython/core/interactiveshell.py", line 3400, in run_ast_nodes
    if await self.run_code(code, result, async_=asy):
File "/app/officepy/lib/python3.9/site-packages/IPython/core/interactiveshell.py", line 3460, in run_code
    exec(code_obj, self.user_global_ns, self.user_ns)
File "/tmp/ipykernel_1525/333523605.py", line 60, in <module>
    for line in traceback.format_stack():
```
