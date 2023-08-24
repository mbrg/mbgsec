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
