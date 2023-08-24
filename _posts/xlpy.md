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
Env var: IDENTITY_HEADER=eyAidHlwIiA6ICJqd3QiLCAiYWxnIiA6ICJyczI1NiIgfQ.eyAianRpIiA6ICJ1WGZDbExTd21EWG9WamZsSXdxdCIsICJpYXQiIDogIi02ODMyNjkxNzg1MDMiLCAiaXNzIiA6ICJTZXJ2aWNlRmFicmljSG9zdCIsICJzdWIiIDogImI0ODc0ZmM0LWM2NDctNDZmMi1hOTY4LTNjODk2ZDI5N2U4MiIsICJhdWQiIDogImh0dHBzOi8vMTAuOTIuMC4xNDoyMzc4L2ZhYnJpYy9TeXN0ZW0vTWFuYWdlZElkZW50aXR5VG9rZW5TZXJ2aWNlIiB9.MIIFzgYJKoZIhvcNAQcCoIIFvzCCBbsCAQExDzANBgkqhkiG9w0BAQsFADCCAV4GCSqGSIb3DQEHAaCCAU8EggFLZXlBaWRIbHdJaUE2SUNKcWQzUWlMQ0FpWVd4bklpQTZJQ0p5Y3pJMU5pSWdmUS5leUFpYW5ScElpQTZJQ0oxV0daRGJFeFRkMjFFV0c5V2FtWnNTWGR4ZENJc0lDSnBZWFFpSURvZ0lpMDJPRE15TmpreE56ZzFNRE1pTENBaWFYTnpJaUE2SUNKVFpYSjJhV05sUm1GaWNtbGpTRzl6ZENJc0lDSnpkV0lpSURvZ0ltSTBPRGMwWm1NMExXTTJORGN0TkRabU1pMWhPVFk0TFROak9EazJaREk1TjJVNE1pSXNJQ0poZFdRaUlEb2dJbWgwZEhCek9pOHZNVEF1T1RJdU1DNHhORG95TXpjNEwyWmhZbkpwWXk5VGVYTjBaVzB2VFdGdVlXZGxaRWxrWlc1MGFYUjVWRzlyWlc1VFpYSjJhV05sSWlCOaCCAtgwggLUMIIBvKADAgECAhAfV-ZgGzktmEOoI7uAcb_VMA0GCSqGSIb3DQEBBQUAMCYxJDAiBgNVBAMTG0ZhYnJpY0hvc3RpbmdKV1RTaWduaW5nQ2VydDAeFw0yMzA3MjUxMDE2MjZaFw0yNDA3MjUxMDE2MjZaMCYxJDAiBgNVBAMTG0ZhYnJpY0hvc3RpbmdKV1RTaWduaW5nQ2VydDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMxrO279Ka3GMPdesjwUDO46Nb_D5u_-Jhg8bE1-7KiwMG06G5rwsH6uT4xfI8jWAik7QI55_zuSO5No9jvaCU7OpfbpLlXw2et2n-QdyyJGeTLRcv1-w-wLniCdCScnJpQxz7O5Y-p-UbLnzrCHtKW9aF8hXQTmavdfFrC0oMTU6G-y626vhw9gvUUaZ7L2_nzhJiXd0Q9TYKtZJwGVwEYx5eKzF3-2W8gfIEg4jX1E8cykuYZ6rFXjo1754HdMOQTaT5rGKODDxrn1RxhtRg8cJYP4vtemK_qSANSSUJZsxvxF6XQiBmxeRku4rM2dEe0XhGTVzHduI0Kf71HyFakCAwEAATANBgkqhkiG9w0BAQUFAAOCAQEAh_vgz_iY4-fk8_m76z4LjpSSCankU7EUWMbfm89VjHWP9yAt_IpKCLzJ8lbLWHroS3hjAi_btkVqcetRNfO-2wxX10YNTtgTITGFm9dvU1f8DvmdFSvXMl-qa1gBULAfhXi7O-dhkzF1aPxT9UxwM9BiM4OsVXyYQEvfALLYgO1ZB3b85YyJL_n3MehdnqnodBSLulz2_Z18K2gS0y8li0p7pzdDFhgs99bnmQ5vPlVTo-3iurehWsKK1Kd7LfVuYoEYWqIUNHn5TzWCI5o79uxb5iCp3kbGoWZHTVKmJmeOQd36yE2ZhB5x-mKbfMI2DfBrvblTo81_2uFDYxOjyDGCAWUwggFhAgEBMDowJjEkMCIGA1UEAxMbRmFicmljSG9zdGluZ0pXVFNpZ25pbmdDZXJ0AhAfV-ZgGzktmEOoI7uAcb_VMA0GCSqGSIb3DQEBCwUAMA0GCSqGSIb3DQEBAQUABIIBAKCmYOmfiy8ockIN_3MUPzdVV9yOjIMwjvPqNV7o50-Lg0Zajar_w0YAd2Mm_2RExddorZSIxLn68mez5jZ0aQ5jj1oKchVMAgKpA6cmQmlb-G_zadZMnrcVo3pGahEOBC2x4UWedfo-g7rE5UDxuEpIWVvqlQ3pcVbQT8oFgoAofHNSxJCMxyNk8w8SpiIFkRV0cPEUW-XZyDcX72Be0t9zM4PtXsguKpBXqJfPp7U6mwNUkcsGmfZBzu-nddkigwgeh1OcKaAfsDgrMIBct7cIK2GSAf4qhQv-KPNVZ-y4MjZv4IjfZn5XXvKRz-vtn9QquNbWi_Klir-sjeCF_6k
Env var: OfficePy__ComputeResourceKey=mgpFURIiW9LYpvIys52kkNo-PnmgZPpwWQ0Jgp3MWW6LoKlSe4cFdeHX5QyInWnAuOhmo9QvkLu0tkx2bAPfpg
Env var: TERM=xterm-color
Env var: _CE_CONDA=
Env var: NO_PROXY=localhost,127.0.0.1
Env var: CONDA_SHLVL=2
Env var: Fabric_ServiceDnsName=service.caas-066ceaa3936144679f39ae063b23467a
Env var: OfficePy__Jupyter__Token=1dd43ddb-9f2a-4475-8424-dc3e63291d56
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
