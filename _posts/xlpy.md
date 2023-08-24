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
